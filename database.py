import sqlite3

def setup_db():
    conn = sqlite3.connect('smartworker.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS invoices
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  date TEXT,
                  client TEXT,
                  amount REAL,
                  bill_text TEXT)''')
    try:
        c.execute("ALTER TABLE invoices ADD COLUMN phone TEXT")
    except:
        pass
        
    c.execute('''CREATE TABLE IF NOT EXISTS measurements
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  date TEXT,
                  project_type TEXT,
                  details TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS user_profile
                 (id INTEGER PRIMARY KEY,
                  name TEXT,
                  shop_name TEXT,
                  email TEXT,
                  phone TEXT,
                  gst TEXT,
                  address TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS customers
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  phone TEXT,
                  address TEXT)''')
    c.execute('''CREATE TABLE IF NOT EXISTS expenses
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  date TEXT,
                  category TEXT,
                  supplier TEXT,
                  memo_no TEXT,
                  amount REAL)''')
                  
    # --- Bill Settings Table ---
    c.execute('''CREATE TABLE IF NOT EXISTS bill_settings
                 (key_name TEXT PRIMARY KEY,
                  value TEXT)''') 
                  
    # Insert missing keys automatically without erasing old ones
    default_settings = [
        ('Default Unit', 'Feet'),
        ('Domal 27x65 (2-Track)', '0.0'), ('Domal 27x65 (3-Track)', '0.0'), ('Domal 27x65 (4-Track)', '0.0'),
        ('Domal 35x75 (2-Track)', '0.0'), ('Domal 35x75 (3-Track)', '0.0'), ('Domal 35x75 (4-Track)', '0.0'),
        
        ('Sliding 18x40 (2-Track)', '0.0'), ('Sliding 18x40 (3-Track)', '0.0'), ('Sliding 18x40 (4-Track)', '0.0'),
        ('Sliding 18x50 (2-Track)', '0.0'), ('Sliding 18x50 (3-Track)', '0.0'), ('Sliding 18x50 (4-Track)', '0.0'),
        ('Sliding 18x60 (2-Track)', '0.0'), ('Sliding 18x60 (3-Track)', '0.0'), ('Sliding 18x60 (4-Track)', '0.0'),
        ('Sliding 25x50 (2-Track)', '0.0'), ('Sliding 25x50 (3-Track)', '0.0'), ('Sliding 25x50 (4-Track)', '0.0'),
        ('Sliding 25x65 (2-Track)', '0.0'), ('Sliding 25x65 (3-Track)', '0.0'), ('Sliding 25x65 (4-Track)', '0.0'),
        
        ('Casement 34 Series', '0.0'), ('Casement 40 Series', '0.0'),
        ('Standard Door', '0.0'), ('Floor Spring Door', '0.0'), ('Top Hung Door', '0.0'), ('Domal Door', '0.0'),
        ('Fixed Partition', '0.0'), ('Door Partition', '0.0'),
        ('Gypsum Ceiling', '0.0'), ('PVC Ceiling', '0.0'),
        ('Other Work', '0.0'), ('GST', '0.0'), ('Discount', '0.0')
    ]
    c.executemany("INSERT OR IGNORE INTO bill_settings (key_name, value) VALUES (?, ?)", default_settings)
                  
    conn.commit()
    conn.close()

def get_user_profile():
    try:
        conn = sqlite3.connect('smartworker.db')
        c = conn.cursor()
        c.execute("SELECT name, shop_name, email, phone, gst, address FROM user_profile LIMIT 1")
        row = c.fetchone()
        conn.close()
        if row:
            return {'name': row[0], 'shop_name': row[1], 'email': row[2], 'phone': row[3], 'gst': row[4], 'address': row[5]}
    except: pass
    return None
