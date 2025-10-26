# Let's Print - SaaS Landing Page

A modern, responsive landing page for "Let's Print" - a cloud-based CRM platform for printing startups.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Modern UI/UX**: Clean, startup-friendly design with blue, white, and yellow accent colors
- **Interactive Elements**: 
  - Animated testimonials slider
  - FAQ accordion
  - Pricing toggle (Monthly/Annual)
  - Smooth scrolling navigation
  - Mobile menu
  - Hover effects and animations
- **Optimized Performance**: Vanilla JavaScript (no frameworks), fast loading times

## 📋 Sections

1. **Hero Section**: Bold headline with CTA buttons and stats
2. **User Roles**: 4 user types (Super Admin, Production Admin, Business Owner, Client)
3. **How It Works**: 3-step process visualization
4. **Features Grid**: 9 key features with icons
5. **Pricing Plans**: 3 tiers (Starter, Professional, Enterprise) with monthly/annual toggle
6. **Testimonials**: Slider with 4 customer reviews
7. **FAQ**: Accordion-style frequently asked questions
8. **CTA Section**: Final call-to-action
9. **Footer**: Comprehensive links and contact information

## 🎨 Design Elements

- **Colors**:
  - Primary Blue: `#2563EB`
  - Accent Yellow: `#FCD34D`
  - White: `#FFFFFF`
  - Grays: Various shades for text and backgrounds

- **Typography**: System font stack for optimal performance
- **Icons**: SVG icons for scalability and performance
- **Border Radius**: Rounded corners for modern feel
- **Shadows**: Layered shadows for depth

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties (CSS variables), Flexbox, Grid, animations
- **Vanilla JavaScript**: No dependencies, pure ES6+

## 📦 File Structure

```
lets-print-prototype-v1/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Interactive functionality
├── package.json        # Package configuration
└── README.md          # This file
```

## 🚀 Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. That's it! No build process or dependencies required.

### Alternative: Use a local server

For the best experience, you can serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server (install with: npm install -g http-server)
http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## ✨ Interactive Features

### Mobile Menu
- Hamburger menu for mobile devices
- Smooth slide-in animation
- Auto-closes on link click

### Pricing Toggle
- Switch between monthly and annual pricing
- Smooth price transition animation
- Visual feedback with active states

### Testimonials Slider
- Auto-advance every 5 seconds
- Manual navigation with prev/next buttons
- Dot indicators for current slide
- Pauses on hover

### FAQ Accordion
- Click to expand/collapse answers
- Smooth height transition
- Auto-closes other items when opening new one

### Scroll Animations
- Fade-in animations for sections
- Parallax effect in hero section
- Animated statistics counter
- Smooth scroll to anchor links

## 🎯 Use Cases

This landing page is perfect for:
- SaaS product launches
- Printing business platforms
- CRM solutions
- Multi-tenant applications
- Subscription-based services

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 🔧 Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-blue: #2563EB;
    --accent-yellow: #FCD34D;
    /* ... other variables */
}
```

### Content
Edit the text directly in `index.html`. All content is clearly organized by section.

### Images
Replace the placeholder SVG avatars in testimonials with actual images:

```html
<img src="path/to/image.jpg" alt="Name">
```

## 📄 License

MIT License - feel free to use this template for your projects!

## 🤝 Support

For questions or issues, contact: hello@letsprint.com

---

Built with ❤️ for printing startups worldwide

