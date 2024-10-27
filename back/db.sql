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

create table mailboxes(
    id serial primary key,
    mailbox varchar (255)
);

INSERT INTO keywords(keyw) VALUES
    (ARRAY['изменить тариф', 'изменение тарифа', 'помоги с изменением тарифа', 'поменяй тариф', 
           'поменять тариф', 'сменить тариф', 'смени тариф', 'смена тарифа', 'сменой тарифа', 
           'тариф', 'тарифы', 'сменить', 'смена', 'перейти на новый тариф', 'тарифный план', 
           'сменить план', 'смена плана', 'тарифный пакет', 'обновить тариф', 'изменить план']),
           
    (ARRAY['услуга', 'дополнительная услуга', 'услуги', 'подключить услугу', 
           'подключить дополнительную услугу', 'добавить услугу', 'активировать услугу', 
           'добавить дополнительную услугу', 'включить услугу', 'подключить новый сервис', 
           'услуги компании', 'подключение услуги', 'подключение сервиса', 'заказать услугу']),
           
    (ARRAY['договор', 'заключить договор', 'договоры', 'заключить контракт', 'подписать договор', 
           'оформить договор', 'оформить контракт', 'оформление договора', 'оформление контракта', 
           'новый договор', 'подписание договора', 'договор о сотрудничестве', 'оформить',
           'договор на оказание услуг']),
           
    (ARRAY['удалить услугу', 'отключить услугу', 'отключение услуги', 'деактивировать услугу', 
           'деактивация услуги', 'отключить сервис', 'отключение сервиса', 'закрыть услугу', 
           'убрать услугу', 'отменить услугу', 'прекратить услугу', 'удалить']),
           
    (ARRAY['подключить тариф', 'тарифное подключение', 'новый тариф', 'подключение тарифа', 
           'подключить новый тариф', 'активировать тариф', 'активация тарифа', 
           'тарифный план активации', 'новый тарифный план', 'включить тариф', 'доступный тариф']),
           
    (ARRAY['поддержка', 'служба поддержки', 'техническая поддержка', 'помощь', 'служба помощи', 
           'помощь клиентам', 'связаться с поддержкой', 'техподдержка', 'связь с поддержкой', 
           'помощь специалиста', 'консультация', 'помогите', 'нужна помощь']),
           
    (ARRAY['список услуг', 'услуги компании', 'все услуги', 'доступные услуги', 'перечень услуг', 
           'какие есть услуги', 'показать услуги', 'услуги организации', 'доступные сервисы', 
           'предоставляемые услуги', 'каталог услуг', 'услуги для клиента']),
           
    (ARRAY['список тарифов', 'тарифные планы', 'тарифы компании', 'все тарифы', 'перечень тарифов', 
           'какие есть тарифы', 'показать тарифы', 'доступные тарифы', 'тарифные пакеты', 
           'предоставляемые тарифы', 'тарифы для клиентов', 'доступные тарифные планы']),
           
    (ARRAY['приветствие', 'здравствуйте', 'добрый день', 'привет', 'хай', 'здравствуй', 
           'приветик', 'доброго дня', 'добрый вечер', 'здравствуйте!', 'приветствую', 
           'хочу поздороваться', 'здорово']),
           
    (ARRAY['прощание', 'до свидания', 'пока', 'прощайте', 'всего хорошего', 'до встречи', 
           'увидимся', 'прощай', 'доброго пути', 'пока-пока', 'до скорого', 'спокойной ночи', 
           'до новых встреч', 'покеда']);


INSERT INTO intentions(intention, keyword_id) VALUES
    ('изменить тариф', 1),
    ('подключить услугу', 2),
    ('заключить договор', 3),
    ('удалить услугу', 4),
    ('подключить тариф', 5),
    ('поддержка', 6),
    ('список услуг', 7),
    ('список тарифов', 8),
    ('приветствие', 9),
    ('прощание', 10);


INSERT INTO additional_text(add_text, intention_id) VALUES
    ('Для изменения тарифа, пожалуйста, укажите желаемый тарифный план или номер тарифа.', 1),
    ('Для подключения дополнительной услуги, укажите точное название услуги, которую хотите подключить.', 2),
    ('Для заключения договора, пожалуйста, укажите детали и тип договора.', 3),
    ('Для удаления услуги, укажите название услуги, которую хотите отключить.', 4),
    ('Для подключения нового тарифа, укажите название тарифа или выберите из доступных.', 5),
    ('Для связи со службой поддержки, опишите свою проблему, и мы постараемся помочь.', 6),
    ('Вот полный список доступных услуг. Если хотите узнать детали, уточните конкретную услугу.', 7),
    ('Вот перечень тарифных планов. Для информации о конкретном тарифе, пожалуйста, укажите его название.', 8),
    ('Здравствуйте! Чем могу помочь?', 9),
    ('До свидания! Надеюсь, скоро снова смогу быть полезен.', 10);

INSERT INTO users(account) VALUES
(123456),
(654321);

INSERT INTO admins(admin_login, admin_password, is_admin) VALUES
('admin1', 'password1', true),
('admin2', 'password2', true),
('editor1', 'password3', false);
