# TODO: Improve Restaurant App Styling

## Tasks

- [x] Reduce size of reservation table boxes (table cards)
- [x] Make overall application elements smaller
- [ ] Enhance professional appearance with better styling
- [x] Add "Ubicaciones" button next to "Agregar Mesa"
- [x] Improve responsiveness of header buttons
- [x] Reposition button icons above text for better visibility
- [x] Improve locations modal sizing and styling
- [x] Center the close button (X) in modal circles
- [x] Fix capacity input field width in "Agregar Mesa" modal
- [x] Make location select field same width as capacity input
- [x] Make location table cards smaller in Ubicaciones modal
- [x] Fix scrollbar positioning in Ubicaciones modal
- [x] Close select table modal automatically when selecting a table
- [x] Center the "No hay reservas activas" message in reservations modal
- [x] Move reservations badge higher above the button

## Details

- Modified grid layout for table cards to use smaller min width (200px instead of 280px)
- Reduced padding and margins throughout the app
- Adjusted font sizes and spacing for compactness
- Added "Ubicaciones" button with modal showing tables organized by location
- Improved mobile responsiveness for header buttons (stacked vertically on small screens)
- Repositioned button icons above text using flexbox column layout
- Reduced locations modal max-width to 600px and max-height to 70vh
- Made location table cards smaller (140px min-width, reduced padding and font sizes)
- Centered the close button (X) in modal circles by adding line-height: 1
- Fixed capacity input field width by adding margin and using calc(100% - 1rem)
- Made location select field same width as capacity input by applying same styles
- Added custom dropdown arrow to select fields for better appearance
- Fixed scrollbar positioning by adding padding-right to large-modal
- Added showSelectModal.value = false in abrirReserva function to close select modal when selecting a table
- Added flexbox centering and min-height to .no-reservations for better centering
- Added grid-column: 1 / -1 to .no-reservations to span full width in grid layout
- Moved reservations badge higher by changing top from -6px to -10px
- Test responsiveness after changes
