import pymorphy2

# Создаем объект морфологического анализатора
morph = pymorphy2.MorphAnalyzer()


def lemmatize_text(text):
    # Разбиваем текст на слова
    words = text.split()
    # Лемматизируем каждое слово и объединяем их в строку через пробел
    lemmatized_text = ' '.join(morph.parse(word)[0].normal_form for word in words)
    return lemmatized_text


def check_keywords(keywords, text):
    # Лемматизируем строку для проверки с помощью pymorphy2
    morph = pymorphy2.MorphAnalyzer()
    lemmatized_text = ' '.join(morph.parse(word)[0].normal_form for word in text.split())

    # Проверяем, содержится ли хотя бы одно из ключевых слов в лемматизированной строке
    for keyword in keywords:
        if keyword in lemmatized_text:
            return True

    return False
