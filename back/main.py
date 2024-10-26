from aiohttp.web import run_app
from routes import init_app
from storage import add_db_to_context

if __name__ == '__main__':
    app = init_app()
    app.on_startup.append(add_db_to_context)
    run_app(app=app, port=5000)