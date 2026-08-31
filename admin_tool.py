import hashlib

SALTS = {
    "1": {"name": "1 Month (69 Rs)", "salt": "SAHEB_1M_PRO"},
    "3": {"name": "3 Months (159 Rs)", "salt": "SAHEB_3M_PRO"},
    "12": {"name": "1 Year (549 Rs)", "salt": "SAHEB_1Y_PRO"}
}

print("=== SMART WORKER PRO ADMIN ===")
device_id = input("Enter Customer Device ID: ").strip().upper()

print("\nPackages:")
print("1 = 1 Month")
print("3 = 3 Months")
print("12 = 1 Year")
pkg = input("Select Package (1/3/12): ").strip()

if pkg in SALTS:
    salt = SALTS[pkg]["salt"]
    key = hashlib.sha256((device_id + salt).encode()).hexdigest()[:8].upper()
    print(f"\n✅ Package: {SALTS[pkg]['name']}")
    print(f"✅ Send this Activation Key: {key}")
else:
    print("Invalid Package Selected!")
