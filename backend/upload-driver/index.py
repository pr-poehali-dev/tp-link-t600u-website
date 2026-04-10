import json
import os
import base64
import boto3
import psycopg2

def handler(event: dict, context) -> dict:
    """Загружает файл драйвера в S3 и сохраняет мета-данные в БД"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    filename = body.get('filename', '')
    os_name = body.get('os_name', '')
    version = body.get('version', '')
    file_data_b64 = body.get('file_data', '')

    if not filename or not os_name or not file_data_b64:
        return {
            'statusCode': 400,
            'headers': cors,
            'body': json.dumps({'error': 'filename, os_name and file_data are required'})
        }

    file_bytes = base64.b64decode(file_data_b64)
    file_size_mb = round(len(file_bytes) / (1024 * 1024), 1)
    s3_key = f'drivers/{filename}'

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=s3_key, Body=file_bytes, ContentType='application/octet-stream')
    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{s3_key}"

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    cur.execute(
        f"SELECT id FROM {schema}.drivers WHERE os_name=%s",
        (os_name,)
    )
    existing = cur.fetchone()

    if existing:
        cur.execute(
            f"UPDATE {schema}.drivers SET cdn_url=%s, version=%s, size_mb=%s, filename=%s, uploaded_at=NOW() WHERE os_name=%s",
            (cdn_url, version, file_size_mb, filename, os_name)
        )
    else:
        cur.execute(
            f"INSERT INTO {schema}.drivers (os_name, filename, version, size_mb, cdn_url) VALUES (%s, %s, %s, %s, %s)",
            (os_name, filename, version, file_size_mb, cdn_url)
        )

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'cdn_url': cdn_url, 'size_mb': file_size_mb})
    }
