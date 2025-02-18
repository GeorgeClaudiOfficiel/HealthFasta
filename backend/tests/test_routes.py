import unittest
from app import create_app

class TestRoutes(unittest.TestCase):
    def setUp(self):
        self.app = create_app().test_client()

    def test_get_patients(self):
        response = self.app.get('/patient')
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
