-- navMain: Playground
UPDATE menu_items SET icon='SquareTerminal' WHERE id='nm-1';
UPDATE menu_items SET icon='History'        WHERE id='nm-1-1';
UPDATE menu_items SET icon='Star'           WHERE id='nm-1-2';
UPDATE menu_items SET icon='Settings'       WHERE id='nm-1-3';

-- navMain: Models
UPDATE menu_items SET icon='Bot'            WHERE id='nm-2';
UPDATE menu_items SET icon='Sparkles'       WHERE id='nm-2-1';  -- Genesis
UPDATE menu_items SET icon='Compass'        WHERE id='nm-2-2';  -- Explorer
UPDATE menu_items SET icon='Atom'           WHERE id='nm-2-3';  -- Quantum

-- navMain: Documentation
UPDATE menu_items SET icon='BookOpen'       WHERE id='nm-3';
UPDATE menu_items SET icon='BookOpenText'   WHERE id='nm-3-1';  -- Introduction
UPDATE menu_items SET icon='Play'           WHERE id='nm-3-2';  -- Get Started
UPDATE menu_items SET icon='GraduationCap'  WHERE id='nm-3-3';  -- Tutorials
UPDATE menu_items SET icon='ListOrdered'    WHERE id='nm-3-4';  -- Changelog

-- navMain: Settings
UPDATE menu_items SET icon='Settings2'      WHERE id='nm-4';
UPDATE menu_items SET icon='Settings'       WHERE id='nm-4-1';  -- General
UPDATE menu_items SET icon='Users'          WHERE id='nm-4-2';  -- Team
UPDATE menu_items SET icon='CreditCard'     WHERE id='nm-4-3';  -- Billing
UPDATE menu_items SET icon='Gauge'          WHERE id='nm-4-4';  -- Limits

-- projects
UPDATE menu_items SET icon='Frame'          WHERE id='pr-1';    -- Design Engineering
UPDATE menu_items SET icon='PieChart'       WHERE id='pr-2';    -- Sales & Marketing
UPDATE menu_items SET icon='Map'            WHERE id='pr-3';    -- Travel
