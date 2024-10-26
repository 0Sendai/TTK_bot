from aiohttp import web
import aiohttp_cors
from storage import AdminRecord, db_key

routes = web.RouteTableDef()


@routes.post('/login')
async def login(request: web.Request) -> web.Response:
    db = request.app[db_key]
    data = await request.json()
    user = AdminRecord(data['username'], data['password'])
    if await db.auth_admin(user):
        return web.json_response({'success': True})

    return web.json_response({'success': False})

@routes.get('/admins')
async def admins_get(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    response = await db.get_admins()
    return web.json_response(response)


@routes.get('/intentions')
async def intentions_get(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    data = await db.con.fetch(
        '''select intention, keyw from intentions right join keywords on intentions.keyword_id = keywords.id;'''
    )
    res = []
    for i in range(len(data)):
        tmp = dict()
        tmp['intention'] = data[i]['intention']
        keywords = []
        for value in data[i]['keyw']:
            keywords.append(value)
        tmp['keywords'] = keywords
        res.append(tmp)
    return web.json_response(res)

@routes.post('/intentions')
async def intentions_post(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    data = await request.json()
    try:
        id = await db.con.fetchrow(
            '''INSERT INTO keywords keyw VALUES ($1) RETURNING id''',
            data['keywords']
        )
        await db.con.execute(
            '''INSERT INTO intentions (intention, keyword_id) VALUES ($1, $2)''',
            data['intention'], id
        )
    except Exception as e:
        print(e)
        return web.json_response({'success': False})
    return web.json_response({'success': True})

def init_app() -> web.Application:
    app = web.Application()
    app.add_routes(routes)

    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })

    for route in list(app.router.routes()):
        cors.add(route)

    return app
