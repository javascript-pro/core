'use client';

import * as React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Popover,
  IconButton,
} from '@mui/material';
import { MightyButton } from '../../';
import { marked } from 'marked';
import { templatePDF } from './';
import { useSlice, useDispatch } from '../../';
import { updateCVKey } from './';

export type TControls = {
  markdown?: string;
};

export default function Controls({ markdown = 'No content' }: TControls) {
  const slice = useSlice();
  const dispatch = useDispatch();
  const resume = slice.cv?.resume || {};
  const sections = resume.sections || [];

  // popup anchor state
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleToggleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Slugify helper
  const slugify = (str: string): string =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

  // Filter visible sections
  const getTailoredMarkdown = (original: string, sections: typeof resume.sections) => {
    const lines = original.split('\n');
    const visibleIds = new Set(sections.filter((s) => s.visible).map((s) => s.id));

    let include = true;
    const result: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('## ')) {
        const title = line.replace(/^## /, '').trim();
        const id = slugify(title);
        include = visibleIds.has(id);
      }

      if (include) result.push(line);
    }

    return result.join('\n');
  };

  // Download PDF
  const onDownloadClick = async () => {
    const { default: html2pdf } = await import('html2pdf.js');
    const fullHTML = templatePDF(marked.parse(markdown || '') as string);

    const el = document.createElement('div');
    el.innerHTML = fullHTML;

    html2pdf()
      .from(el)
      .set({
        margin: 0,
        filename: 'Chris_Dorward_CV.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .save();
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'white',
          display: 'flex',
          boxShadow: 0,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <MightyButton
            icon="techstack"
            label="Sections"
            variant="outlined"
            color="secondary"
            onClick={handleToggleClick as any}
          />
          <MightyButton
            icon="save"
            label="Download"
            variant="outlined"
            color="secondary"
            onClick={onDownloadClick}
          />
        </Toolbar>
      </AppBar>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <FormGroup>
            {sections.map((section, index) => (
              <FormControlLabel
                key={section.id}
                control={
                  <Checkbox
                    checked={section.visible}
                    onChange={(e) => {
                      const updatedSections = [...sections];
                      updatedSections[index] = {
                        ...updatedSections[index],
                        visible: e.target.checked,
                      };

                      const original = resume.original || '';
                      const tailored = getTailoredMarkdown(original, updatedSections);

                      dispatch(
                        updateCVKey('cv.resume', {
                          sections: updatedSections,
                          tailored,
                        })
                      );
                    }}
                  />
                }
                label={section.title}
              />
            ))}
          </FormGroup>
        </Box>
      </Popover>
    </>
  );
}
