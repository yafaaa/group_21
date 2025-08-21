# CSV Student Import System

## Overview

The CSV import system allows you to bulk import student data from CSV files with automatically generated credentials. This is perfect for importing the complete list of summer camp students with consistent, secure, and trackable credentials.

## Features

### 🔄 **Two Import Methods**
1. **Web Interface**: User-friendly web form with preview functionality
2. **Management Command**: Command-line tool for batch processing

### 🆔 **Automatic Credential Generation**
- **Student IDs**: ITC3001, ITC3002, ITC3003... (sequential)
- **Usernames**: Generated from names (e.g., "Abrham Aklilu" → "abrhama")
- **Passwords**: Secure, name-based generation (e.g., "abrak261")

### 🛡️ **Safety Features**
- Preview mode to check imports before saving
- Duplicate detection and handling
- Error reporting for invalid names
- Transaction rollback on failures

## Usage

### Method 1: Web Interface

1. **Start the server**:
   ```bash
   python manage.py runserver
   ```

2. **Navigate to**: http://localhost:8000/csv-import/

3. **Upload CSV file**:
   - Click "Choose File" and select your CSV
   - Optionally select a default department
   - Check "Preview only" to see results before importing

4. **Preview and Import**:
   - Review the generated credentials
   - Click "Confirm Import" if everything looks good

### Method 2: Management Command

1. **Preview import** (recommended first):
   ```bash
   python manage.py import_students_csv students.csv --dry-run
   ```

2. **Actual import**:
   ```bash
   python manage.py import_students_csv students.csv
   ```

3. **With department assignment**:
   ```bash
   python manage.py import_students_csv students.csv --department EMBED
   ```

## CSV File Format

### Required Format
```csv
Full Name
Abrham tesfaye aklilu
Ferhan sadat Nesha
Abadi Adanew Gebreslasie
Abay Zinabu Sisay
...
```

### Requirements
- ✅ First row can be a header (will be automatically detected and skipped)
- ✅ Each row should contain one student's full name
- ✅ Names should have at least first and last name
- ✅ Middle names are optional and will be preserved
- ✅ File must have .csv extension
- ✅ Maximum file size: 5MB
- ✅ UTF-8 encoding supported (handles international characters)

### Supported Name Formats
- `John Doe` → First: John, Last: Doe
- `John Smith Doe` → First: John, Middle: Smith, Last: Doe
- `Abrham tesfaye aklilu` → First: Abrham, Middle: tesfaye, Last: aklilu

## Generated Credentials

### Student ID Pattern
- **Format**: `ITC` + 4-digit number
- **Example**: ITC3001, ITC3002, ITC3003...
- **Logic**: Auto-increments from highest existing ID

### Username Generation
- **Base pattern**: `[first_name][first_letter_of_last_name]`
- **Max length**: 8 characters
- **Uniqueness**: Adds numbers if duplicate (username1, username2...)
- **Examples**:
  - "Abrham Aklilu" → `abrhama`
  - "Ferhan Nesha" → `ferhann`
  - "Michael Johnson" → `michaelj`

### Password Generation
- **Pattern**: `[first_3_chars][last_2_chars][3_digits]`
- **Security**: Based on name hash, unique per student
- **Length**: 6-10 characters
- **Examples**:
  - "Abrham Aklilu" → `abrak261`
  - "Ferhan Nesha" → `ferne155`
  - "Michael Johnson" → `micjo272`

## Examples

### Command Line Example
```bash
# Preview 20 students from your CSV
python manage.py import_students_csv camp_students.csv --dry-run

# Import all students to "Embedded & Robotics" department
python manage.py import_students_csv camp_students.csv --department EMBED

# Output:
# ✓ Created: Abrham tesfaye aklilu (ITC3001)
# ✓ Created: Ferhan sadat Nesha (ITC3002)
# ✓ Created: Abadi Adanew Gebreslasie (ITC3003)
# ...
# ✅ Imported 385 students successfully
```

### Sample Generated Credentials
Based on your provided CSV data:

| Full Name | Student ID | Username | Password |
|-----------|------------|----------|----------|
| Abrham tesfaye aklilu | ITC3001 | abrhama | abrak261 |
| Ferhan sadat Nesha | ITC3002 | ferhann | ferne155 |
| Abadi Adanew Gebreslasie | ITC3003 | abadig | abage655 |
| Abay Zinabu Sisay | ITC3004 | abays | abasi966 |
| Abdella Ahmed Yasin | ITC3005 | abdellay | abdya257 |

## Error Handling

### Common Issues and Solutions

**❌ "Name must have at least first and last name"**
- Fix: Ensure each row has at least 2 name parts
- Example: "John" → "John Doe"

**❌ "Username already exists"**
- Automatic: System adds numbers (username1, username2...)
- Manual: Check for duplicate imports

**❌ "File must have .csv extension"**
- Fix: Save file as .csv format
- Excel: File → Save As → CSV (Comma delimited)

**❌ "File size must be less than 5MB"**
- Fix: Split large files into smaller batches
- Or increase limit in settings

## Integration with Summer Camp System

### Department Assignment
- Students can be assigned to departments during import
- Use department codes: EMBED, CYBER, AERO, DEV
- Or assign departments later through the admin interface

### User Roles
- All imported students get "STUDENT" role automatically
- Ready for dorm assignments and meal tracking
- Compatible with attendance system

### Security
- Passwords are hashed in database (not stored as plain text)
- Students will need to log in with generated credentials
- Admins can reset passwords if needed

## Files Created

This CSV import system includes:

1. **Management Command**: `core/management/commands/import_students_csv.py`
2. **Web Form**: `core/forms.py` (CSVImportForm)
3. **Web View**: `core/views.py` (CSVImportView)
4. **Template**: `core/templates/core/csv_import.html`
5. **URL Route**: `/csv-import/`
6. **Test Scripts**: `test_csv_import.py`, `demo_credentials.py`

## Testing

Run the included test script to verify everything works:

```bash
python test_csv_import.py
```

This will:
- Create sample CSV file
- Test the management command
- Check web interface availability
- Show credential generation examples
- Clean up test data

## Next Steps

1. **Prepare Your CSV**: Use the format shown above
2. **Test with Sample**: Try with a few students first
3. **Preview Import**: Use dry-run or preview mode
4. **Full Import**: Import all your summer camp students
5. **Verify Results**: Check the students list at `/students/`

Your CSV import system is ready! You can now efficiently import all 385+ summer camp students with consistent, secure credentials.
