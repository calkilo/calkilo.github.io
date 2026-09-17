import importlib.util
from pathlib import Path
import unittest
spec = importlib.util.spec_from_file_location('redirects', Path(__file__).with_name('reload-site.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
class Redirects(unittest.TestCase):
    def test_chain_and_index(self):
        self.assertEqual(module.redirect_map('/old /middle 301\n/middle /new/ 301\n/index.html / 301\n'), '"/middle" "/new/";\n"/old" "/new/";\n')
    def test_reject_config_injection_and_cycles(self):
        for data in ['/a /b; 301', '/a https://evil.example/ 301', '/a /b 302', '/a /b 301\n/b /a 301', '/a /../etc/ 301']:
            with self.assertRaises(ValueError): module.redirect_map(data)
if __name__ == '__main__': unittest.main()
