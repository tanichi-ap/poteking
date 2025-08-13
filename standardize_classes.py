#!/usr/bin/env python3
"""
Script to standardize CSS class structure across IT category files
following the pattern from it-internet.html
"""

import re
import sys
from pathlib import Path

# Define the standardization patterns
REPLACEMENTS = [
    # Main structure changes
    (r'<div class="main-article">', ''),
    (r'<div class="container">\s*<div class="breadcrumb">', '<div class="container">\n            <div class="breadcrumb">'),
    (r'</div>\s*<article class="article">', '</div>\n        </div>\n        \n        <div class="container main-grid">\n            <article class="article">'),
    
    # Replace custom classes with standard ones
    (r'<div class="market-analysis">', '<div class="industry-customization">'),
    (r'<div class="growth-factor">', '<div class="industry-card">'),
    (r'<div class="market-segment">', '<div class="industry-card">'),
    (r'<div class="challenge-card">', '<div class="industry-card">'),
    (r'<div class="opportunity-card">', '<div class="industry-card">'),
    (r'<div class="platform-comparison">', '<div class="industry-customization">'),
    (r'<div class="platform-card">', '<div class="industry-card">'),
    (r'<div class="platform-details">', '<div class="industry-content">'),
    (r'<div class="technical-categories">', '<div class="impression-points">'),
    (r'<div class="skill-category">', '<div class="point-card">'),
    (r'<div class="skill-details">', '<div class="element-content">'),
    (r'<div class="job-roles-detail">', '<div class="industry-customization">'),
    (r'<div class="role-card">', '<div class="industry-card">'),
    (r'<div class="role-content">', '<div class="industry-content">'),
    (r'<div class="technical-qa">', '<div class="industry-customization">'),
    (r'<div class="qa-category">', '<div class="industry-card">'),
    (r'<div class="question-block">', '<div class="industry-content">'),
    (r'<div class="answer-strategy">', '<div class="example-box">'),
    (r'<div class="example-text">', '<div class="example-box">'),
    (r'<div class="design-scenarios">', '<div class="industry-customization">'),
    (r'<div class="scenario-card">', '<div class="industry-card">'),
    (r'<div class="scenario-content">', '<div class="industry-content">'),
    (r'<div class="preparation-strategy">', '<div class="impression-points">'),
    (r'<div class="prep-phase">', '<div class="point-card">'),
    (r'<div class="prep-content">', '<div class="element-content">'),
    (r'<div class="final-checklist">', '<div class="example-box">'),
    
    # Point-card icon structure
    (r'<h3><i class="([^"]+)"></i>\s*([^<]+)</h3>\s*<div class="element-content">', 
     r'<div class="point-icon">\n                                        <i class="\1"></i>\n                                    </div>\n                                    <h3>\2</h3>\n                                    <div class="element-content">'),
    
    # Sidebar structure
    (r'<aside class="sticky-sidebar">\s*<div class="sidebar">', '<aside class="sidebar">'),
    (r'</div>\s*</aside>', '</aside>'),
]

def standardize_file(file_path):
    """Standardize classes in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add page-enhancements.css if missing
        if 'page-enhancements.css' not in content:
            content = content.replace(
                '<link rel="stylesheet" href="css/pages.css">',
                '<link rel="stylesheet" href="css/pages.css">\n    <link rel="stylesheet" href="css/page-enhancements.css">'
            )
        
        # Apply all replacements
        for pattern, replacement in REPLACEMENTS:
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        # Write back the modified content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ Standardized {file_path}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all IT files"""
    files_to_process = [
        'it-cloud.html',
        'it-security.html', 
        'it-software.html',
        'it-career.html',
        'it-newgrad.html',
        'it-network.html'
    ]
    
    base_dir = Path('.')
    success_count = 0
    
    for filename in files_to_process:
        file_path = base_dir / filename
        if file_path.exists():
            if standardize_file(file_path):
                success_count += 1
        else:
            print(f"✗ File not found: {file_path}")
    
    print(f"\nProcessed {success_count}/{len(files_to_process)} files successfully")

if __name__ == '__main__':
    main()