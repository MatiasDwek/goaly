import datetime
import random
import string


def generate_id() -> str:
    """
    Generates a random id in [a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3} format
    """
    id_parts = [
        "".join(random.choices(string.ascii_lowercase + string.digits, k=3))
        for _ in range(3)
    ]
    return "-".join(id_parts)


def validate_date(date: str) -> bool:
    try:
        year, month, day = date.split("/")
        datetime.datetime(year=year, month=month, day=day)
    except:
        return False
    return True
