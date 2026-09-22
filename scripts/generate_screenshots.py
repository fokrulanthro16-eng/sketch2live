"""
Script to generate high-fidelity application screenshots and UI demo previews for Sketch2Live.
Generates:
1. docs/screenshots/studio-preview.png
2. docs/screenshots/ux-audit.png
3. docs/screenshots/disaster-triage.png
"""

import os
from PIL import Image, ImageDraw, ImageFont

def get_font(size=14, bold=False):
    font_candidates = [
        "segoeui.ttf", "segoeuib.ttf" if bold else "segoeui.ttf",
        "arial.ttf", "arialbd.ttf" if bold else "arial.ttf",
        "calibri.ttf"
    ]
    for candidate in font_candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except Exception:
            pass
    return ImageFont.load_default()

def draw_rounded_rect(draw, bbox, radius=8, fill=None, outline=None, width=1):
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

def render_top_navbar(draw, width=1400, active_badge="Gemini 1.5 Flash", show_download=True):
    # Header bar
    draw.rectangle([0, 0, width, 64], fill="#09090b", outline="#27272a", width=1)
    
    # Logo
    draw_rounded_rect(draw, [24, 14, 58, 48], radius=8, fill="#2563eb", outline="#3b82f6")
    font_icon = get_font(18, bold=True)
    draw.text((34, 18), "Z", font=font_icon, fill="#ffffff") # Lightning placeholder
    
    # Brand text
    font_brand = get_font(18, bold=True)
    draw.text((68, 16), "Sketch2Live", font=font_brand, fill="#ffffff")
    
    # Pill badge
    draw_rounded_rect(draw, [184, 20, 310, 42], radius=11, fill="#1e293b", outline="#3b82f6")
    draw.text((195, 23), "NEXT.JS STUDIO", font=get_font(10, bold=True), fill="#60a5fa")
    
    draw.text((68, 40), "Wireframe Sketch & Whiteboard to Live HTML5 + Tailwind CSS", font=get_font(11), fill="#71717a")
    
    # Right toolbar
    # Model dropdown
    draw_rounded_rect(draw, [960, 16, 1120, 48], radius=8, fill="#18181b", outline="#27272a")
    draw.text((975, 24), active_badge, font=get_font(11, bold=True), fill="#e4e4e7")
    
    # API key configured pill
    draw_rounded_rect(draw, [1130, 16, 1265, 48], radius=8, fill="#064e3b", outline="#059669")
    draw.text((1142, 24), "API Key Configured", font=get_font(11, bold=True), fill="#34d399")
    
    # Download .html button
    if show_download:
      draw_rounded_rect(draw, [1275, 16, 1376, 48], radius=8, fill="#059669", outline="#10b981")
      draw.text((1286, 24), "Download .html", font=get_font(11, bold=True), fill="#ffffff")

def generate_studio_preview(output_path):
    width, height = 1400, 920
    img = Image.new("RGB", (width, height), "#09090b")
    draw = ImageDraw.Draw(img)
    
    render_top_navbar(draw, width=width, active_badge="Gemini 1.5 Flash")
    
    # Left Panel (Input Wireframe)
    left_x0, left_y0, left_x1, left_y1 = 24, 84, 460, 890
    draw_rounded_rect(draw, [left_x0, left_y0, left_x1, left_y1], radius=16, fill="#0f0f13", outline="#27272a")
    
    font_section = get_font(12, bold=True)
    draw.text((left_x0 + 16, left_y0 + 16), "BUILT-IN SAMPLE WIREFRAMES", font=font_section, fill="#a1a1aa")
    
    # 3 Presets Buttons
    presets = [("SaaS Landing", True), ("Mobile Auth", False), ("Disaster Triage", False)]
    for i, (p_title, is_sel) in enumerate(presets):
        bx = left_x0 + 16 + i * 136
        by = left_y0 + 42
        fill_col = "#1e3a8a" if is_sel else "#18181b"
        border_col = "#3b82f6" if is_sel else "#27272a"
        text_col = "#ffffff" if is_sel else "#a1a1aa"
        draw_rounded_rect(draw, [bx, by, bx + 128, by + 68], radius=10, fill=fill_col, outline=border_col)
        draw.text((bx + 10, by + 12), p_title, font=get_font(11, bold=True), fill=text_col)
        draw.text((bx + 10, by + 34), "1-Click Demo", font=get_font(9), fill="#93c5fd" if is_sel else "#71717a")
    
    # Input wireframe preview box
    draw.text((left_x0 + 16, left_y0 + 130), "INPUT WIREFRAME (ACTIVE GROUND TRUTH)", font=font_section, fill="#a1a1aa")
    preview_box = [left_x0 + 16, left_y0 + 154, left_x1 - 16, left_y0 + 510]
    draw_rounded_rect(draw, preview_box, radius=12, fill="#000000", outline="#27272a")
    
    # Insert thumbnail if exists
    presets_dir = os.path.join(os.path.dirname(os.path.dirname(output_path)), "public", "presets")
    saas_img_path = os.path.join(presets_dir, "saas_landing_sketch.png")
    if os.path.exists(saas_img_path):
        try:
            thumb = Image.open(saas_img_path).resize((preview_box[2] - preview_box[0] - 8, preview_box[3] - preview_box[1] - 8))
            img.paste(thumb, (preview_box[0] + 4, preview_box[1] + 4))
        except Exception:
            pass

    # Snap sketch with camera button
    cam_btn = [left_x0 + 16, left_y0 + 525, left_x1 - 16, left_y0 + 565]
    draw_rounded_rect(draw, cam_btn, radius=10, fill="#1e1b4b", outline="#6366f1")
    draw.text((cam_btn[0] + 80, cam_btn[1] + 10), "Snap Sketch with Camera (Zero Upload)", font=get_font(11, bold=True), fill="#c7d2fe")

    # Optional preferences box
    opt_btn = [left_x0 + 16, left_y0 + 580, left_x1 - 16, left_y0 + 645]
    draw_rounded_rect(draw, opt_btn, radius=10, fill="#18181b", outline="#27272a")
    draw.text((opt_btn[0] + 14, opt_btn[1] + 10), "Optional Styling Preferences", font=get_font(11, bold=True), fill="#d4d4d8")
    draw.text((opt_btn[0] + 14, opt_btn[1] + 32), "E.g., Indigo theme, glassmorphism cards, Inter font...", font=get_font(10), fill="#71717a")

    # Primary Convert Button
    cta_btn = [left_x0 + 16, left_y0 + 665, left_x1 - 16, left_y0 + 725]
    draw_rounded_rect(draw, cta_btn, radius=12, fill="#2563eb", outline="#3b82f6")
    draw.text((cta_btn[0] + 110, cta_btn[1] + 18), "Convert to Live UI", font=get_font(14, bold=True), fill="#ffffff")

    # RIGHT PANEL: Output Studio
    right_x0, right_y0, right_x1, right_y1 = 480, 84, 1376, 890
    
    # Top Tab Bar
    tab_w = 210
    draw_rounded_rect(draw, [right_x0, right_y0, right_x0 + tab_w, right_y0 + 38], radius=8, fill="#1e293b", outline="#3b82f6")
    draw.text((right_x0 + 18, right_y0 + 10), "Live Interactive Preview", font=get_font(11, bold=True), fill="#60a5fa")

    draw_rounded_rect(draw, [right_x0 + tab_w + 8, right_y0, right_x0 + tab_w * 2 + 8, right_y0 + 38], radius=8, fill="#18181b", outline="#27272a")
    draw.text((right_x0 + tab_w + 24, right_y0 + 10), "Generated Source Code", font=get_font(11, bold=True), fill="#a1a1aa")

    draw_rounded_rect(draw, [right_x0 + tab_w * 2 + 16, right_y0, right_x0 + tab_w * 3 + 16, right_y0 + 38], radius=8, fill="#18181b", outline="#27272a")
    draw.text((right_x0 + tab_w * 2 + 32, right_y0 + 10), "AI UX Audit [95]", font=get_font(11, bold=True), fill="#c084fc")

    # Studio Frame Container
    studio_box = [right_x0, right_y0 + 48, right_x1, right_y1]
    draw_rounded_rect(draw, studio_box, radius=16, fill="#0f0f13", outline="#27272a")

    # Studio Toolbar with Trace & Compare View
    draw.rectangle([studio_box[0], studio_box[1], studio_box[2], studio_box[1] + 46], fill="#18181b", outline="#27272a", width=1)
    
    # Single vs Split Compare Toggle
    draw_rounded_rect(draw, [studio_box[0] + 16, studio_box[1] + 8, studio_box[0] + 110, studio_box[1] + 38], radius=6, fill="#09090b", outline="#27272a")
    draw.text((studio_box[0] + 28, studio_box[1] + 14), "Single View", font=get_font(10), fill="#71717a")

    draw_rounded_rect(draw, [studio_box[0] + 118, studio_box[1] + 8, studio_box[0] + 245, studio_box[1] + 38], radius=6, fill="#2563eb", outline="#3b82f6")
    draw.text((studio_box[0] + 130, studio_box[1] + 14), "Split Compare (Trace)", font=get_font(10, bold=True), fill="#ffffff")

    draw.text((studio_box[2] - 180, studio_box[1] + 14), "Side-by-Side Audit Mode", font=get_font(11), fill="#10b981")

    # Split Comparison View: 2 Columns
    split_y0 = studio_box[1] + 58
    split_h = 600
    col_w = (studio_box[2] - studio_box[0] - 48) // 2

    # Left Split: Original Sketch
    col1 = [studio_box[0] + 16, split_y0, studio_box[0] + 16 + col_w, split_y0 + split_h]
    draw_rounded_rect(draw, col1, radius=12, fill="#000000", outline="#27272a")
    draw.rectangle([col1[0], col1[1], col1[2], col1[1] + 32], fill="#18181b")
    draw.text((col1[0] + 12, col1[1] + 8), "Original Wireframe Sketch (Ground Truth)", font=get_font(10, bold=True), fill="#93c5fd")
    if os.path.exists(saas_img_path):
        try:
            sk_thumb = Image.open(saas_img_path).resize((col_w - 12, split_h - 44))
            img.paste(sk_thumb, (col1[0] + 6, col1[1] + 38))
        except Exception:
            pass

    # Right Split: Synthesized Interactive Live UI
    col2 = [studio_box[0] + 32 + col_w, split_y0, studio_box[2] - 16, split_y0 + split_h]
    draw_rounded_rect(draw, col2, radius=12, fill="#020617", outline="#3b82f6", width=2)
    draw.rectangle([col2[0], col2[1], col2[2], col2[1] + 32], fill="#1e293b")
    draw.text((col2[0] + 12, col2[1] + 8), "Live Synthesized UI (Tailwind CSS CDN)", font=get_font(10, bold=True), fill="#34d399")

    # Render simulated polished UI inside right column
    ui_y = col2[1] + 44
    draw.rectangle([col2[0] + 10, ui_y, col2[2] - 10, ui_y + 40], fill="#0f172a")
    draw.text((col2[0] + 20, ui_y + 12), "SaaSify.io", font=get_font(12, bold=True), fill="#ffffff")
    draw.text((col2[0] + 120, ui_y + 14), "Features   Solutions   Pricing", font=get_font(10), fill="#94a3b8")
    draw_rounded_rect(draw, [col2[2] - 100, ui_y + 6, col2[2] - 20, ui_y + 34], radius=6, fill="#2563eb")
    draw.text((col2[2] - 88, ui_y + 12), "Get Started", font=get_font(9, bold=True), fill="#ffffff")

    # Hero headline
    draw.text((col2[0] + 35, ui_y + 70), "Scale Your Workflow with Next-Gen AI", font=get_font(16, bold=True), fill="#ffffff")
    draw.text((col2[0] + 40, ui_y + 100), "Automate business telemetry and customer engagement in minutes.", font=get_font(10), fill="#94a3b8")

    # CTAs
    draw_rounded_rect(draw, [col2[0] + 110, ui_y + 130, col2[0] + 210, ui_y + 165], radius=6, fill="#2563eb")
    draw.text((col2[0] + 125, ui_y + 140), "Start Free Trial", font=get_font(10, bold=True), fill="#ffffff")
    draw_rounded_rect(draw, [col2[0] + 225, ui_y + 130, col2[0] + 315, ui_y + 165], radius=6, fill="#1e293b", outline="#475569")
    draw.text((col2[0] + 245, ui_y + 140), "Book Demo", font=get_font(10), fill="#e2e8f0")

    # 3 Cards grid inside right column
    card_y = ui_y + 190
    card_w = (col_w - 40) // 3
    card_titles = ["Lightning Fast", "SOC-2 Certified", "Live Telemetry"]
    card_colors = ["#3b82f6", "#10b981", "#8b5cf6"]
    for j in range(3):
        cx = col2[0] + 14 + j * (card_w + 6)
        draw_rounded_rect(draw, [cx, card_y, cx + card_w, card_y + 160], radius=8, fill="#0f172a", outline="#1e293b")
        draw_rounded_rect(draw, [cx + 10, card_y + 10, cx + 36, card_y + 36], radius=6, fill=card_colors[j])
        draw.text((cx + 10, card_y + 45), card_titles[j], font=get_font(10, bold=True), fill="#ffffff")
        draw.text((cx + 10, card_y + 70), "Processes events\nwith zero latency\nglobally.", font=get_font(8), fill="#94a3b8")
        draw.text((cx + 10, card_y + 130), "Learn more ->", font=get_font(9, bold=True), fill=card_colors[j])

    # Bottom Chat Refinement bar
    ref_bar = [studio_box[0] + 16, studio_box[3] - 70, studio_box[2] - 16, studio_box[3] - 16]
    draw_rounded_rect(draw, ref_bar, radius=12, fill="#18181b", outline="#27272a")
    draw.text((ref_bar[0] + 16, ref_bar[1] + 16), "Chat with your UI... (e.g. 'Make CTA gradient purple', 'Add a 3-tier pricing section')", font=get_font(11), fill="#71717a")
    draw_rounded_rect(draw, [ref_bar[2] - 110, ref_bar[1] + 8, ref_bar[2] - 10, ref_bar[3] - 8], radius=8, fill="#7c3aed")
    draw.text((ref_bar[2] - 90, ref_bar[1] + 18), "Refine UI", font=get_font(10, bold=True), fill="#ffffff")

    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

def generate_ux_audit_preview(output_path):
    width, height = 1400, 920
    img = Image.new("RGB", (width, height), "#09090b")
    draw = ImageDraw.Draw(img)
    
    render_top_navbar(draw, width=width, active_badge="Gemini 1.5 Flash")
    
    # Hero Card for AI Staff UX Architect
    hero_box = [80, 100, width - 80, 310]
    draw_rounded_rect(draw, hero_box, radius=20, fill="#111827", outline="#374151")
    
    # AI Icon
    draw_rounded_rect(draw, [110, 130, 174, 194], radius=16, fill="#581c87", outline="#9333ea")
    draw.text((128, 145), "AI", font=get_font(22, bold=True), fill="#ffffff")
    
    draw.text((195, 132), "AI Staff UX Architect & Self-Healing Evaluation", font=get_font(22, bold=True), fill="#ffffff")
    draw.text((195, 168), "Gemini 1.5 Flash autonomously audited your raw drawing for visual hierarchy, usability, and accessibility,", font=get_font(12), fill="#9ca3af")
    draw.text((195, 190), "then synthesized an auto-healed, production-grade layout adhering to WCAG 2.1 AA standards.", font=get_font(12), fill="#9ca3af")
    
    # Circular Gauge Metric Box
    gauge_box = [width - 360, 120, width - 110, 290]
    draw_rounded_rect(draw, gauge_box, radius=16, fill="#030712", outline="#1f2937")
    
    # Outer circle
    draw.ellipse([gauge_box[0] + 20, gauge_box[1] + 20, gauge_box[0] + 130, gauge_box[1] + 130], outline="#1f2937", width=10)
    draw.arc([gauge_box[0] + 20, gauge_box[1] + 20, gauge_box[0] + 130, gauge_box[1] + 130], start=-90, end=250, fill="#10b981", width=10)
    draw.text((gauge_box[0] + 55, gauge_box[1] + 52), "94", font=get_font(28, bold=True), fill="#ffffff")
    draw.text((gauge_box[0] + 48, gauge_box[1] + 88), "UX SCORE", font=get_font(9, bold=True), fill="#6b7280")
    
    draw.text((gauge_box[0] + 145, gauge_box[1] + 45), "A+ Production Grade", font=get_font(12, bold=True), fill="#f3f4f6")
    draw.text((gauge_box[0] + 145, gauge_box[1] + 70), "+24% Usability Lift", font=get_font(11, bold=True), fill="#34d399")
    draw.text((gauge_box[0] + 145, gauge_box[1] + 95), "WCAG 2.1 AA Certified", font=get_font(10), fill="#9ca3af")

    # 2 Comparison Columns
    col_w = (width - 160 - 30) // 2
    
    # Left: Raw Sketch Flaws
    c_left = [80, 335, 80 + col_w, 730]
    draw_rounded_rect(draw, c_left, radius=16, fill="#1c120c", outline="#78350f")
    draw.text((c_left[0] + 24, c_left[1] + 20), "RAW SKETCH CRITIQUE & FLAWS DETECTED", font=get_font(13, bold=True), fill="#fcd34d")
    
    flaws = [
        "Unclear visual hierarchy: Call-to-action button blends with secondary navigation links.",
        "Cramped mobile touch targets: Action links spaced under 24px, violating tap ergonomics.",
        "Low contrast boundaries: Monochromatic sketch lacks distinction for error and focus states.",
        "Undefined responsive behavior: Single-column wireframe gives no grid collapse cues."
    ]
    for idx, flaw in enumerate(flaws):
        fy = c_left[1] + 65 + idx * 80
        draw_rounded_rect(draw, [c_left[0] + 20, fy, c_left[2] - 20, fy + 65], radius=10, fill="#09090b", outline="#92400e")
        draw.ellipse([c_left[0] + 32, fy + 16, c_left[0] + 42, fy + 26], fill="#f59e0b")
        draw.text((c_left[0] + 52, fy + 12), flaw[:54], font=get_font(11, bold=True), fill="#fef3c7")
        draw.text((c_left[0] + 52, fy + 32), flaw[54:], font=get_font(11), fill="#d1d5db")

    # Right: Self-Healing Auto-Fixes
    c_right = [80 + col_w + 30, 335, width - 80, 730]
    draw_rounded_rect(draw, c_right, radius=16, fill="#052e16", outline="#065f46")
    draw.text((c_right[0] + 24, c_right[1] + 20), "SELF-HEALING AUTO-FIXES APPLIED BY GEMINI", font=get_font(13, bold=True), fill="#6ee7b7")
    
    fixes = [
        "Elevated color contrast to WCAG 2.1 AA 4.5:1 using slate-950 and vibrant blue-600 tokens.",
        "Expanded all button click zones to minimum 48px touch heights with active scale feedback.",
        "Structured semantic HTML5 landmarks (<header>, <nav>, <main>, <footer>) for screen readers.",
        "Implemented fluid Tailwind CSS grid responsive across mobile (375px) to 4K desktop."
    ]
    for idx, fix in enumerate(fixes):
        fy = c_right[1] + 65 + idx * 80
        draw_rounded_rect(draw, [c_right[0] + 20, fy, c_right[2] - 20, fy + 65], radius=10, fill="#09090b", outline="#047857")
        draw.ellipse([c_right[0] + 32, fy + 16, c_right[0] + 42, fy + 26], fill="#10b981")
        draw.text((c_right[0] + 52, fy + 12), fix[:54], font=get_font(11, bold=True), fill="#d1fae5")
        draw.text((c_right[0] + 52, fy + 32), fix[54:], font=get_font(11), fill="#d1d5db")

    # Standards Compliance Matrix at bottom
    matrix_box = [80, 755, width - 80, 875]
    draw_rounded_rect(draw, matrix_box, radius=16, fill="#111827", outline="#374151")
    draw.text((matrix_box[0] + 24, matrix_box[1] + 16), "STANDARDS COMPLIANCE & ACCESSIBILITY MATRIX", font=get_font(11, bold=True), fill="#9ca3af")
    
    matrix_items = [
        ("WCAG AA Contrast", "4.5:1 Text-to-BG"),
        ("Semantic HTML5", "<header>, <nav>, <main>"),
        ("Touch Ergonomics", "48px Min Target Zone"),
        ("Responsive Fluidity", "Auto-Collapse Breakpoints")
    ]
    m_w = (width - 160 - 48) // 4
    for k, (title, sub) in enumerate(matrix_items):
        mx = matrix_box[0] + 24 + k * (m_w + 12)
        draw_rounded_rect(draw, [mx, matrix_box[1] + 45, mx + m_w, matrix_box[1] + 102], radius=10, fill="#030712", outline="#1f2937")
        draw.text((mx + 14, matrix_box[1] + 56), f"v  {title}", font=get_font(11, bold=True), fill="#34d399")
        draw.text((mx + 14, matrix_box[1] + 76), sub, font=get_font(9), fill="#9ca3af")

    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

def generate_disaster_triage_preview(output_path):
    width, height = 1400, 920
    img = Image.new("RGB", (width, height), "#09090b")
    draw = ImageDraw.Draw(img)
    
    render_top_navbar(draw, width=width, active_badge="Gemini 1.5 Flash")
    
    # Mission Banner
    mission_box = [60, 90, width - 60, 185]
    draw_rounded_rect(draw, mission_box, radius=16, fill="#450a0a", outline="#991b1b")
    draw_rounded_rect(draw, [mission_box[0] + 20, mission_box[1] + 16, mission_box[0] + 80, mission_box[1] + 76], radius=12, fill="#dc2626")
    draw.text((mission_box[0] + 38, mission_box[1] + 32), "+", font=get_font(28, bold=True), fill="#ffffff")
    
    draw.text((mission_box[0] + 96, mission_box[1] + 22), "DISASTER RELIEF FIELD TRIAGE & INTAKE", font=get_font(20, bold=True), fill="#ffffff")
    draw.text((mission_box[0] + 96, mission_box[1] + 54), "Offline Emergency Field Logistics • Client-Side RAM Buffer • Instant CSV Export", font=get_font(12), fill="#fca5a5")

    # Offline Status Pill & Export CSV Action Button
    draw_rounded_rect(draw, [width - 380, mission_box[1] + 26, width - 240, mission_box[1] + 66], radius=10, fill="#064e3b", outline="#059669")
    draw.text((width - 365, mission_box[1] + 38), "RAM Buffer Active", font=get_font(11, bold=True), fill="#34d399")

    draw_rounded_rect(draw, [width - 225, mission_box[1] + 26, width - 85, mission_box[1] + 66], radius=10, fill="#059669", outline="#10b981")
    draw.text((width - 208, mission_box[1] + 38), "Export CSV", font=get_font(12, bold=True), fill="#ffffff")

    # 2-Column Split: Form on Left | Registry on Right
    left_w = 480
    f_box = [60, 205, 60 + left_w, 880]
    draw_rounded_rect(draw, f_box, radius=16, fill="#0f172a", outline="#1e293b")
    draw.text((f_box[0] + 20, f_box[1] + 18), "1. VICTIM & INTAKE FORM", font=get_font(12, bold=True), fill="#f1f5f9")

    # Priority Badges Selector
    draw.text((f_box[0] + 20, f_box[1] + 50), "Triage Priority Category", font=get_font(11, bold=True), fill="#cbd5e1")
    cat_items = [("RED: Immediate", "#ef4444"), ("YELLOW: Delayed", "#f59e0b"), ("GREEN: Minor", "#10b981"), ("BLACK: Expectant", "#475569")]
    for idx, (c_label, c_col) in enumerate(cat_items):
        px = f_box[0] + 20 + (idx % 2) * 224
        py = f_box[1] + 75 + (idx // 2) * 44
        draw_rounded_rect(draw, [px, py, px + 214, py + 38], radius=8, fill=c_col)
        draw.text((px + 12, py + 12), c_label, font=get_font(10, bold=True), fill="#ffffff")

    # Form Fields
    fields = [
        ("Patient / Family Identifier", "Maria Sanchez / Family of 3", 185),
        ("Age & Gender", "34 / Female (Adult)", 265),
        ("Sector / Relief Grid Location", "Sector 4-B (North Relief Camp)", 345),
        ("Critical Medical Condition", "Severe blunt trauma, severe dehydration", 425),
        ("Emergency Supplies Needed", "Clean Water (10L), Medical Splints, MREs x 6", 505),
    ]
    for label, val, y in fields:
        draw.text((f_box[0] + 20, f_box[1] + y), label, font=get_font(11, bold=True), fill="#94a3b8")
        draw_rounded_rect(draw, [f_box[0] + 20, f_box[1] + y + 22, f_box[2] - 20, f_box[1] + y + 62], radius=8, fill="#020617", outline="#334155")
        draw.text((f_box[0] + 32, f_box[1] + y + 36), val, font=get_font(11), fill="#f8fafc")

    # Submit Button
    submit_btn = [f_box[0] + 20, f_box[1] + 595, f_box[2] - 20, f_box[1] + 655]
    draw_rounded_rect(draw, submit_btn, radius=12, fill="#dc2626", outline="#ef4444")
    draw.text((submit_btn[0] + 100, submit_btn[1] + 20), "+ Commit & Log Field Record", font=get_font(13, bold=True), fill="#ffffff")

    # Right Column: Registry Table
    reg_box = [60 + left_w + 24, 205, width - 60, 880]
    draw_rounded_rect(draw, reg_box, radius=16, fill="#0f172a", outline="#1e293b")
    draw.text((reg_box[0] + 20, reg_box[1] + 18), "2. LOCAL TRIAGE REGISTRY (OFFLINE BROWSER BUFFER)", font=get_font(12, bold=True), fill="#f1f5f9")
    draw.text((reg_box[2] - 170, reg_box[1] + 18), "Total Logged: 5 Victims", font=get_font(11), fill="#34d399")

    # Table Header
    th_y = reg_box[1] + 55
    draw_rounded_rect(draw, [reg_box[0] + 16, th_y, reg_box[2] - 16, th_y + 36], radius=6, fill="#1e293b")
    draw.text((reg_box[0] + 30, th_y + 10), "Time", font=get_font(10, bold=True), fill="#cbd5e1")
    draw.text((reg_box[0] + 95, th_y + 10), "Priority", font=get_font(10, bold=True), fill="#cbd5e1")
    draw.text((reg_box[0] + 215, th_y + 10), "Victim / Identifier", font=get_font(10, bold=True), fill="#cbd5e1")
    draw.text((reg_box[0] + 410, th_y + 10), "Sector Grid", font=get_font(10, bold=True), fill="#cbd5e1")
    draw.text((reg_box[0] + 555, th_y + 10), "Medical Condition & Supplies", font=get_font(10, bold=True), fill="#cbd5e1")

    # Table Rows
    records = [
        ("14:02", "RED", "#ef4444", "Maria Sanchez (3)", "Sector 4-B", "Severe trauma, Blood O- needed"),
        ("14:08", "YELLOW", "#f59e0b", "David Chen", "Sector 2-A", "Fracture, Arm splints requested"),
        ("14:15", "GREEN", "#10b981", "Sarah Connor (4)", "North Gate", "Minor lacerations, Water x 10L"),
        ("14:21", "RED", "#ef4444", "Unknown Male #4", "Med Station 1", "Head trauma, Unconscious"),
        ("14:35", "YELLOW", "#f59e0b", "Alvarez Family (5)", "Sector 3-C", "Dehydration, High-calorie MREs"),
        ("14:48", "GREEN", "#10b981", "Elena Rostova", "Relief Tent 2", "Minor contusions, Clean dressings"),
    ]
    for idx, (t, p_name, p_bg, name, sector, cond) in enumerate(records):
        ry = th_y + 44 + idx * 56
        draw_rounded_rect(draw, [reg_box[0] + 16, ry, reg_box[2] - 16, ry + 48], radius=6, fill="#020617", outline="#1e293b")
        draw.text((reg_box[0] + 30, ry + 16), t, font=get_font(10), fill="#94a3b8")
        draw_rounded_rect(draw, [reg_box[0] + 95, ry + 12, reg_box[0] + 185, ry + 36], radius=4, fill=p_bg)
        draw.text((reg_box[0] + 105, ry + 16), p_name, font=get_font(9, bold=True), fill="#ffffff")
        draw.text((reg_box[0] + 215, ry + 16), name, font=get_font(11, bold=True), fill="#f8fafc")
        draw.text((reg_box[0] + 410, ry + 16), sector, font=get_font(10), fill="#94a3b8")
        draw.text((reg_box[0] + 555, ry + 16), cond, font=get_font(10), fill="#e2e8f0")

    # CSV Note at bottom
    draw.text((reg_box[0] + 20, reg_box[3] - 40), "Standard START Emergency Protocol  •  Exports directly to .csv from local browser RAM", font=get_font(11), fill="#64748b")

    img.save(output_path, "PNG")
    print(f"Generated {output_path}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target_dir = os.path.join(base_dir, "docs", "screenshots")
    os.makedirs(target_dir, exist_ok=True)
    
    generate_studio_preview(os.path.join(target_dir, "studio-preview.png"))
    generate_ux_audit_preview(os.path.join(target_dir, "ux-audit.png"))
    generate_disaster_triage_preview(os.path.join(target_dir, "disaster-triage.png"))
