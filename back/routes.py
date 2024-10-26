from aiohttp import web
import aiohttp_cors
from back.storage import AdminRecord, IntentionRecord, db_key

routes = web.RouteTableDef()


@routes.post('/login')
async def login(request: web.Request) -> web.Response:
    db = request.app[db_key]
    data = await request.json()
    user = AdminRecord(username=data['username'],
                       password=data['password'],
                       is_admin=None)
    response = await db.auth_admin(user)
    if response[0]:
        if response[1]:
            return web.json_response({'success': True, 'is_admin': True})
        return web.json_response({'success': True, 'is_admin': False})

    return web.json_response({'success': False})

@routes.get('/admins')
async def admins_get(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    response = await db.get_admins()
    return web.json_response(response)

@routes.post('/admins')
async def admins_post(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    data = await request.json()
    admin = AdminRecord(username=data['admin_login'],
                        password=data['password'],
                        is_admin=True)
    try:
        await db.new_admin(admin)
        return web.json_response({'success': True})
    except:
        return web.json_response({'success': False})


@routes.get('/intentions')
async def intentions_get(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    response = await db.get_intentions()
    return web.json_response(response)

@routes.post('/intentions')
async def intentions_post(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    data = await request.json()
    intention = IntentionRecord(
        intention=data['intention'],
        keywords=data['keywords']
    )
    try:
        await db.new_intention(intention)
    except Exception as e:
        print(e)
        return web.json_response({'success': False})
    return web.json_response({'success': True})

@routes.get('/mailboxes')
async def mailboxes_get(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    response = await db.get_mailboxes()
    return web.json_response(response)

@routes.post('/mailboxes')
async def mailboxes_post(request: web.Request) -> web.json_response:
    db = request.app[db_key]
    data = await request.json()
    try:
        await db.new_mailbox(data['email'])
        return web.json_response({'success': True})
    except:
        return web.json_response({'success': False})
    
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