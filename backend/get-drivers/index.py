import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Возвращает список драйверов с URL для скачивания"""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    cur.execute(f"""
        SELECT id, os_name, filename, version, size_mb, cdn_url, uploaded_at
        FROM {schema}.drivers
        ORDER BY os_name
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    drivers = [
        {
            'id': r[0],
            'os_name': r[1],
            'filename': r[2],
            'version': r[3],
            'size_mb': r[4],
            'cdn_url': r[5],
            'uploaded_at': r[6].strftime('%b %Y') if r[6] else '',
        }
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'drivers': drivers}, ensure_ascii=False)
    }
