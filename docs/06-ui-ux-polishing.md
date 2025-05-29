# UI/UX & Frontend Polishing Task List

> **Instructions:**
> For every task and subtask in this checklist, follow the relevant guidelines from the documentation in the `docs/` folder:
> - [Component Guidelines](01-component-guidelines.md)
> - [State Management](02-state-management.md)
> - [Security Guidelines](03-security-guidelines.md)
> - [Styling Standards](04-styling-standards.md)
> - [Testing Strategy](05-testing-strategy.md)
>
> Before starting a task, review the related guideline(s) and ensure your implementation aligns with best practices for code quality, accessibility, security, styling, and testing. Reference the guideline documents as needed and check off each item only when it meets the documented standards.
>
> **Assistant Instruction:**
> As the coding assistant, when an error is encountered:
> 1. Find and apply the most concise and effective fix possible.
> 2. Once the error is resolved, update your memory with the fix so that if the same error appears again, you can resolve it immediately and efficiently.

## 1. Global UI/UX Enhancements
- [x] Review and refine the color palette for consistency and accessibility (Implemented: Ivory White, Midnight Black, Crimson Red).
- [x] Ensure all fonts, font sizes, and spacing follow a consistent design system (Using: Inter and Roboto Mono).
- [x] Audit and improve responsiveness for all screen sizes (mobile, tablet, desktop).
- [x] Add smooth transitions and animations for navigation and interactive elements.
- [x] Implement a global loading spinner or skeleton screens for async actions.

## 2. Navigation & Layout
- [x] Design and implement a clear, intuitive navigation bar/sidebar.
- [x] Add active state indicators for current routes.
- [x] Ensure the layout adapts gracefully to different user roles (if applicable).
- [ ] Add a user avatar and dropdown menu for profile/logout in the header.

## 3. Authentication Pages (Login, Signup, Verify Email)
- [x] Refine form layouts for clarity and ease of use.
- [x] Add real-time validation and helpful error messages.
- [x] Improve button and input accessibility (focus states, ARIA labels).
- [x] Add success/failure feedback for authentication actions.
- [x] Implement bilingual support for all auth pages

## 4. Dashboard
- [x] Redesign dashboard cards for better visual hierarchy and information clarity.
- [ ] Add icons or illustrations to enhance visual appeal.
- [x] Implement quick actions or shortcuts for common tasks.
- [x] Add bilingual support for welcome messages and card content.

## 5. Appointments, Vehicles, Service History Pages
- [x] Standardize table/list layouts for displaying data.
- [ ] Add sorting, filtering, and search functionality.
- [ ] Use modals or side panels for add/edit actions to avoid full page reloads.
- [x] Add confirmation dialogs for destructive actions (delete, cancel).
- [x] Implement bilingual support for all content including dynamic data (time slots, service types).

## 6. Profile Page
- [x] Improve profile editing UI with clear input fields and save/cancel actions.
- [ ] Add profile picture upload with preview and cropping.
- [x] Display user information in a visually appealing card.
- [x] Add bilingual support for all profile fields and actions.

## 7. Forms & Inputs
- [x] Standardize all form components using your UI library (button, input, label, card).
- [x] Add helper texts and tooltips where necessary.
- [x] Ensure all forms are keyboard accessible.
- [x] Support bilingual placeholders and validation messages.

## 8. Feedback & Notifications
- [x] Implement toast notifications for success, error, and info messages.
- [x] Add inline feedback for form submissions and async actions.
- [x] Ensure all feedback messages are available in both languages.

## 9. Accessibility
- [x] Audit all pages for keyboard navigation and screen reader support.
- [x] Add ARIA roles and labels where needed.
- [x] Ensure sufficient color contrast throughout the app.
- [x] Implement language switching without page refresh.

## 10. Visual Polish & Branding
- [ ] Add favicon and update app title/metadata.
- [x] Refine or add branding elements (logo, icons, illustrations).
- [ ] Review and update all SVGs and images for clarity and optimization.

## 11. Language Support
- [x] Implement language context and hooks for translation management.
- [x] Add translation keys for all static text across pages.
- [x] Create dynamic translation handlers for user-generated content.
- [x] Add language toggle button in header with BM/EN labels.
- [x] Persist language preference.
- [x] Support RTL layout (if needed for future language additions).

## Progress Summary
### Completed:
- Global UI design system (colors, fonts, spacing)
- Loading states and async feedback
- Navigation and layout structure
- Authentication flows and validations
- Form components and accessibility
- Basic responsive design
- User feedback system
- Accessibility compliance
- Comprehensive bilingual support (English/Malay)
- Language switching mechanism

### Pending:
1. User avatar and dropdown menu
2. Icons for dashboard cards
3. Advanced data management (sorting, filtering)
4. Icons for dashboard cards
5. Advanced data management (sorting, filtering)
6. Profile picture upload feature
7. Favicon and app metadata
8. SVG optimization
