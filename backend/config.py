import os

class Config:
    # Docker will pass 'db' as the host. If not, use 'localhost'.
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'localhost')
    
    # Docker will pass 'root'. If not, use 'root'.
    MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
    
    # Docker will pass the password. If not, use your local password.
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'Claudio17.')
    
    # Docker will pass 'healthfasta'. If not, use 'healthfasta'.
    MYSQL_DB = os.environ.get('MYSQL_DB', 'healthfasta')
    
    SECRET_KEY = os.environ.get('SECRET_KEY', 'e9454e10d40412fe95097b3a272474bd3d6b809ae0d99213')
    CORS_HEADERS = 'Content-Type'