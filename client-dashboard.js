// Client Dashboard JavaScript

// Navigation
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeCharts();
    initializeFAQ();
    initializeAccountNavigation();
    populateData();
    setupEventListeners();
});

// Navigation System
function initializeNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const views = document.querySelectorAll('.view');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = item.getAttribute('data-view');
            // Defensive mapping: menu `data-view` uses short names like "dashboard" while
            // the corresponding section ids use the convention `<name>View` (e.g. `dashboardView`).
            const viewId = targetView && targetView.endsWith('View') ? targetView : (targetView + 'View');

            // Update active menu item
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');

            // Update active view
            views.forEach(v => v.classList.remove('active'));
            const targetEl = document.getElementById(viewId);
            if (targetEl) {
                targetEl.classList.add('active');
            }
        });
    });
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

// Chart Initialization
function initializeCharts() {
    // Spending Chart
    const spendingCtx = document.getElementById('spendingChart');
    if (spendingCtx) {
        new Chart(spendingCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Spending',
                    data: [1200, 1900, 1500, 2200, 1800, 2400],
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                    padding: 0
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Account Navigation
function initializeAccountNavigation() {
    const accountNavItems = document.querySelectorAll('.account-nav-item');
    const accountSections = document.querySelectorAll('.account-section');
    
    accountNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            
            // Update active nav item
            accountNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update active section
            accountSections.forEach(section => section.classList.remove('active'));
            const section = document.getElementById(targetSection);
            if (section) {
                section.classList.add('active');
            }
        });
    });
}

// Populate Dashboard Data
function populateData() {
    populateRecentOrders();
    populateOrdersTable();
    populateInvoicesTable();
    populateDesignLibrary();
}

// Populate Recent Orders (Dashboard)
function populateRecentOrders() {
    const orderList = document.querySelector('.order-list');
    if (!orderList) return;
    
    const orders = [
        { id: 'ORD-1023', title: 'Business Cards', date: 'Dec 10, 2024', amount: 450, status: 'Production' },
        { id: 'ORD-1018', title: 'Flyers - 500pc', date: 'Dec 8, 2024', amount: 320, status: 'Shipped' },
        { id: 'ORD-1015', title: 'Banners', date: 'Dec 5, 2024', amount: 580, status: 'Completed' }
    ];
    
    orderList.innerHTML = orders.map(order => `
        <div class="order-item">
            <div class="order-item-info">
                <div class="order-item-id">${order.id}</div>
                <div class="order-item-title">${order.title}</div>
                <div class="order-item-date">${order.date}</div>
            </div>
            <div class="order-item-amount">$${order.amount}</div>
            <span class="badge status-${order.status.toLowerCase()}">${order.status}</span>
        </div>
    `).join('');
}

// Populate Orders Table
function populateOrdersTable() {
    // HTML uses tbody id `ordersTableBody` so select that directly
    const ordersTableBody = document.getElementById('ordersTableBody');
    if (!ordersTableBody) return;
    
    const orders = [
        { id: 'ORD-1023', product: 'Business Cards', quantity: 500, date: 'Dec 10, 2024', status: 'Production', amount: 450 },
        { id: 'ORD-1022', product: 'Brochures', quantity: 200, date: 'Dec 9, 2024', status: 'Pending', amount: 380 },
        { id: 'ORD-1021', product: 'Posters', quantity: 100, date: 'Dec 9, 2024', status: 'Production', amount: 620 },
        { id: 'ORD-1020', product: 'Flyers', quantity: 1000, date: 'Dec 8, 2024', status: 'Shipped', amount: 420 },
        { id: 'ORD-1019', product: 'Banners', quantity: 5, date: 'Dec 7, 2024', status: 'Shipped', amount: 750 },
        { id: 'ORD-1018', product: 'Flyers - 500pc', quantity: 500, date: 'Dec 8, 2024', status: 'Shipped', amount: 320 },
        { id: 'ORD-1017', product: 'Catalogs', quantity: 100, date: 'Dec 6, 2024', status: 'Completed', amount: 890 },
        { id: 'ORD-1016', product: 'Labels', quantity: 2000, date: 'Dec 5, 2024', status: 'Completed', amount: 250 },
        { id: 'ORD-1015', product: 'Banners', quantity: 3, date: 'Dec 5, 2024', status: 'Completed', amount: 580 }
    ];
    
    ordersTableBody.innerHTML = orders.map(order => `
        <tr>
            <td class="text-mono">${order.id}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.date}</td>
            <td><span class="badge status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td><strong>$${order.amount}</strong></td>
            <td>
                <button class="btn-secondary-small" onclick="trackOrder('${order.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11l3 3L22 4"/>
                        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                    </svg>
                    Track
                </button>
            </td>
        </tr>
    `).join('');
}

// Populate Invoices Table
function populateInvoicesTable() {
    // HTML uses tbody id `invoicesTableBody`
    const invoicesTableBody = document.getElementById('invoicesTableBody');
    if (!invoicesTableBody) return;
    
    const invoices = [
        { id: 'INV-1023', date: 'Dec 10, 2024', due: 'Dec 24, 2024', amount: 450, status: 'Unpaid' },
        { id: 'INV-1022', date: 'Dec 9, 2024', due: 'Dec 23, 2024', amount: 380, status: 'Unpaid' },
        { id: 'INV-1021', date: 'Dec 9, 2024', due: 'Dec 23, 2024', amount: 620, status: 'Unpaid' },
        { id: 'INV-1020', date: 'Dec 8, 2024', due: 'Dec 22, 2024', amount: 420, status: 'Paid' },
        { id: 'INV-1019', date: 'Dec 7, 2024', due: 'Dec 21, 2024', amount: 750, status: 'Paid' },
        { id: 'INV-1018', date: 'Dec 8, 2024', due: 'Dec 22, 2024', amount: 320, status: 'Paid' },
        { id: 'INV-1017', date: 'Dec 6, 2024', due: 'Dec 20, 2024', amount: 890, status: 'Paid' },
        { id: 'INV-1016', date: 'Dec 5, 2024', due: 'Dec 19, 2024', amount: 250, status: 'Paid' }
    ];
    
    invoicesTableBody.innerHTML = invoices.map(invoice => `
        <tr>
            <td class="text-mono">${invoice.id}</td>
            <td>${invoice.date}</td>
            <td>${invoice.due}</td>
            <td><strong>$${invoice.amount}</strong></td>
            <td><span class="badge status-${invoice.status.toLowerCase()}">${invoice.status}</span></td>
            <td>
                <button class="btn-secondary-small" onclick="downloadInvoice('${invoice.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download
                </button>
            </td>
        </tr>
    `).join('');
}

// Populate Design Library
function populateDesignLibrary() {
    const designGrid = document.querySelector('.design-grid');
    if (!designGrid) return;
    
    const designs = [
        { id: 1, name: 'Business Card Design v2', date: 'Dec 10, 2024' },
        { id: 2, name: 'Flyer Template', date: 'Dec 8, 2024' },
        { id: 3, name: 'Banner Design', date: 'Dec 5, 2024' },
        { id: 4, name: 'Brochure Layout', date: 'Dec 3, 2024' },
        { id: 5, name: 'Catalog Cover', date: 'Dec 1, 2024' },
        { id: 6, name: 'Logo Design', date: 'Nov 28, 2024' }
    ];
    
    designGrid.innerHTML = designs.map(design => `
        <div class="design-card">
            <div class="design-thumbnail">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                </svg>
                <div class="design-actions-overlay">
                    <button class="design-action-btn" onclick="viewDesign(${design.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                    <button class="design-action-btn" onclick="downloadDesign(${design.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                    </button>
                    <button class="design-action-btn" onclick="deleteDesign(${design.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="design-info">
                <div class="design-name">${design.name}</div>
                <div class="design-date">${design.date}</div>
            </div>
        </div>
    `).join('');
}

// Event Listeners
function setupEventListeners() {
    // Track Shipment Search
    const trackBtn = document.getElementById('trackBtn');
    if (trackBtn) {
        trackBtn.addEventListener('click', performTracking);
    }
    
    const trackingInput = document.getElementById('trackingNumber');
    if (trackingInput) {
        trackingInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performTracking();
            }
        });
    }
    
    // File Upload
    const fileInput = document.getElementById('designFileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // Product Category Filters
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Order Filters
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterOrders);
    });
}

// Tracking Function
function performTracking() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const trackingResults = document.querySelector('.tracking-results');
    
    if (!trackingNumber) {
        alert('Please enter a tracking number');
        return;
    }
    
    // Simulate tracking results
    if (trackingResults) {
        trackingResults.style.display = 'block';
        
        // Update order ID
        const orderIdElement = trackingResults.querySelector('.tracking-order-id');
        if (orderIdElement) {
            orderIdElement.textContent = trackingNumber;
        }
        
        // Scroll to results
        trackingResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Track Order Function
function trackOrder(orderId) {
    // Switch to Track Shipment view
    const views = document.querySelectorAll('.view');
    views.forEach(v => v.classList.remove('active'));

    // data-view for tracking menu item is 'track-shipment' so map to 'track-shipmentView'
    const trackView = document.getElementById('track-shipmentView');
    if (trackView) trackView.classList.add('active');

    // Update menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    const trackMenu = document.querySelector('[data-view="track-shipment"]');
    if (trackMenu) trackMenu.classList.add('active');

    // Set tracking number (input in HTML uses class .tracking-input; try to find it)
    const trackingInput = document.querySelector('.tracking-input') || document.getElementById('trackingNumber');
    if (trackingInput) trackingInput.value = orderId;

    // Perform tracking (small delay to allow view switch)
    setTimeout(() => performTracking(), 120);
}

// File Upload Handler
function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        // Simulate upload
        alert(`Uploading ${files.length} file(s)...`);
        
        // Here you would typically handle the actual file upload
        // For demo purposes, we'll just show a success message
        setTimeout(() => {
            alert('Files uploaded successfully!');
            populateDesignLibrary();
        }, 1000);
    }
}

// Filter Orders
function filterOrders() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    // Get all table rows
    const rows = document.querySelectorAll('#ordersTable tbody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Status filter
        if (statusFilter !== 'all') {
            const statusBadge = row.querySelector('.badge');
            const rowStatus = statusBadge.textContent.trim().toLowerCase();
            if (rowStatus !== statusFilter.toLowerCase()) {
                showRow = false;
            }
        }
        
        // Date filter (simplified - in production you'd compare actual dates)
        if (dateFilter !== 'all' && showRow) {
            // Add date filtering logic here
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Download Invoice
function downloadInvoice(invoiceId) {
    alert(`Downloading invoice ${invoiceId}...`);
    // In production, this would trigger an actual download
}

// Design Actions
function viewDesign(designId) {
    alert(`Viewing design ${designId}`);
    // In production, this would open a modal or new page with the design
}

function downloadDesign(designId) {
    alert(`Downloading design ${designId}...`);
    // In production, this would trigger an actual download
}

function deleteDesign(designId) {
    if (confirm('Are you sure you want to delete this design?')) {
        alert(`Design ${designId} deleted`);
        populateDesignLibrary();
    }
}

// Contact Support Functions
function contactEmail() {
    window.location.href = 'mailto:support@letsprint.com';
}

function contactPhone() {
    window.location.href = 'tel:+1234567890';
}

function startLiveChat() {
    alert('Starting live chat...');
    // In production, this would open a chat widget
}

// Form Submission Handlers
function saveProfile(event) {
    event.preventDefault();
    alert('Profile updated successfully!');
}

function changePassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    alert('Password changed successfully!');
    event.target.reset();
}

function savePaymentMethod(event) {
    event.preventDefault();
    alert('Payment method saved successfully!');
}

function saveShippingAddress(event) {
    event.preventDefault();
    alert('Shipping address saved successfully!');
}

function saveNotificationPreferences(event) {
    event.preventDefault();
    alert('Notification preferences saved!');
}

// New Order - Product Selection
function selectProduct(productName) {
    alert(`Selected: ${productName}\n\nThis would open the order configuration page.`);
    // In production, this would navigate to a detailed order form
}
