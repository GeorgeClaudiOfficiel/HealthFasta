import jwt
import datetime
from config import Config


def generate_token(user_id):
    """Generate a JWT token."""
    payload = {
        "user_id": user_id,
        # Use timezone-aware UTC datetime
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')


def verify_token(token):
    """Verify a JWT token."""
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
