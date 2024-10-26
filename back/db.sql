create table keywords(
    id serial primary key,
    keyw varchar(100)[]
);

create table intentions(
    id serial primary key,
    intention varchar(255),
    keyword_id integer references keywords(id)
);

create table additional_text(
    id serial primary key,
    intention_id integer references intentions(id),
    add_text Text
);

create table users(
    id serial primary key,
    account integer
);

create table admins(
    id serial primary key,
    admin_login varchar(255),
    admin_password varchar(64),
    is_admin boolean
);
INSERT INTO keywords(keyw) VALUES
('тариф', 'изменить тариф', 'тарифы', 'поменять тариф', 'тарифный план'),
('услуга', 'дополнительная услуга', 'услуги', 'подключить услугу', 'подключить дополнительную услугу'),
('договор', 'заключить договор', 'договоры', 'заключить контракт', 'подписать договор');

INSERT INTO intentions(intention, keyword_id) VALUES
('изменить тариф', 1),
('подключить услугу', 2),
('заключить договор', 3),
('удалить услугу', 4),
('подключить тариф', 5),
('поддержка', 6);

INSERT INTO additional_text(add_text, intention_id) VALUES
('Для изменения тарифа пожалуйста, укажите желаемый тарифный план.', 1),
('Для подключения дополнительной услуги пожалуйста, укажите название услуги.', 2),
('Для заключения договора пожалуйста, укажите детали договора.', 3);

INSERT INTO users(account) VALUES
(123456),
(654321);

INSERT INTO admins(admin_login, admin_password, is_admin) VALUES
('admin1', 'password1', true),
('admin2', 'password2', true),
('editor1', 'password3', false);