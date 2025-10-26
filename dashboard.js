// Dashboard JavaScript

// Navigation and View Management
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    populateData();
    initializeSidebar();
});

// Sidebar Toggle
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

// Navigation between views
function initializeNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide all views
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });
            
            // Show selected view
            const viewName = item.getAttribute('data-view');
            const view = document.getElementById(viewName + 'View');
            if (view) {
                view.classList.add('active');
            }
            
            // Close sidebar on mobile
            if (window.innerWidth < 1024) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    });
}

// Initialize Charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: [32000, 35000, 38000, 42000, 45000, 48352],
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                layout: {
                    padding: 0
                }
            }
        });
    }

    // Order Status Chart
    const orderStatusCtx = document.getElementById('orderStatusChart');
    if (orderStatusCtx) {
        new Chart(orderStatusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pending', 'In Production', 'Shipped', 'Completed'],
                datasets: [{
                    data: [24, 45, 28, 245],
                    backgroundColor: [
                        '#F59E0B',
                        '#3B82F6',
                        '#8B5CF6',
                        '#10B981'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 8,
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                layout: {
                    padding: 0
                }
            }
        });
    }

    // Conversion Chart
    const conversionCtx = document.getElementById('conversionChart');
    if (conversionCtx) {
        new Chart(conversionCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Conversion Rate',
                    data: [6.5, 7.2, 8.1, 8.7],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                layout: {
                    padding: 0
                }
            }
        });
    }

    // Monthly Revenue Chart
    const monthlyRevenueCtx = document.getElementById('monthlyRevenueChart');
    if (monthlyRevenueCtx) {
        new Chart(monthlyRevenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [32000, 35000, 38000, 42000, 45000, 48352, 51000, 49000, 53000, 56000, 58000, 60000],
                    backgroundColor: '#2563EB'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000) + 'K';
                            }
                        }
                    }
                },
                layout: {
                    padding: 0
                }
            }
        });
    }

    // Top Products Chart
    const topProductsCtx = document.getElementById('topProductsChart');
    if (topProductsCtx) {
        new Chart(topProductsCtx, {
            type: 'bar',
            data: {
                labels: ['Business Cards', 'Flyers', 'Banners', 'Brochures', 'Posters'],
                datasets: [{
                    label: 'Units Sold',
                    data: [450, 320, 180, 240, 160],
                    backgroundColor: [
                        '#2563EB',
                        '#F59E0B',
                        '#10B981',
                        '#8B5CF6',
                        '#F97316'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                layout: {
                    padding: 0
                }
            }
        });
    }

    // Turnaround Chart
    const turnaroundCtx = document.getElementById('turnaroundChart');
    if (turnaroundCtx) {
        new Chart(turnaroundCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Days',
                    data: [2.8, 2.6, 2.5, 2.4],
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + ' days';
                            }
                        }
                    }
                },
                layout: {
                    padding: 0
                }
            }
        });
    }

    // Delay Chart
    const delayCtx = document.getElementById('delayChart');
    if (delayCtx) {
        new Chart(delayCtx, {
            type: 'pie',
            data: {
                labels: ['On Time', 'Slight Delay', 'Significant Delay'],
                datasets: [{
                    data: [87, 10, 3],
                    backgroundColor: [
                        '#10B981',
                        '#F59E0B',
                        '#EF4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                layout: {
                    padding: 0
                }
            }
        });
    }
}

// Populate Data Tables
function populateData() {
    populateOrdersTable();
    populateDesignGrid();
    populateProductionPipeline();
    populateCustomersTable();
    populateCampaignsList();
    populateInvoicesTable();
}

// Orders Table
function populateOrdersTable() {
    const ordersData = [
        { id: '#ORD-1234', customer: 'Sarah Mitchell', customerInitials: 'SM', product: 'Business Cards', quantity: 500, date: 'Oct 24, 2025', amount: 245.00, status: 'pending' },
        { id: '#ORD-1233', customer: 'James Chen', customerInitials: 'JC', product: 'Flyers A5', quantity: 1000, date: 'Oct 23, 2025', amount: 680.00, status: 'production' },
        { id: '#ORD-1232', customer: 'Alex Rivera', customerInitials: 'AR', product: 'Banners 2x6 ft', quantity: 3, date: 'Oct 22, 2025', amount: 450.00, status: 'shipped' },
        { id: '#ORD-1231', customer: 'Lisa Kim', customerInitials: 'LK', product: 'Brochures A4', quantity: 250, date: 'Oct 21, 2025', amount: 385.00, status: 'completed' },
        { id: '#ORD-1230', customer: 'Michael Torres', customerInitials: 'MT', product: 'Posters A3', quantity: 100, date: 'Oct 20, 2025', amount: 320.00, status: 'production' },
        { id: '#ORD-1229', customer: 'Emily Davis', customerInitials: 'ED', product: 'Business Cards', quantity: 1000, date: 'Oct 19, 2025', amount: 425.00, status: 'completed' },
        { id: '#ORD-1228', customer: 'David Brown', customerInitials: 'DB', product: 'Flyers A4', quantity: 500, date: 'Oct 18, 2025', amount: 380.00, status: 'completed' },
        { id: '#ORD-1227', customer: 'Sophie Wilson', customerInitials: 'SW', product: 'Stickers (Custom)', quantity: 2000, date: 'Oct 17, 2025', amount: 550.00, status: 'shipped' }
    ];

    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;

    const statusClasses = {
        'pending': 'status-pending',
        'production': 'status-production',
        'shipped': 'status-shipped',
        'completed': 'status-completed'
    };

    const statusLabels = {
        'pending': 'Pending',
        'production': 'In Production',
        'shipped': 'Shipped',
        'completed': 'Completed'
    };

    tableBody.innerHTML = ordersData.map(order => `
        <tr>
            <td><input type="checkbox"></td>
            <td><span class="text-mono">${order.id}</span></td>
            <td>
                <div class="customer-cell">
                    <img src="data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%234FACFE'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3E${order.customerInitials}%3C/text%3E%3C/svg%3E" alt="${order.customer}">
                    <span>${order.customer}</span>
                </div>
            </td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.date}</td>
            <td><strong>$${order.amount.toFixed(2)}</strong></td>
            <td><span class="badge ${statusClasses[order.status]}">${statusLabels[order.status]}</span></td>
            <td>
                <button class="btn-icon" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// Design Grid
function populateDesignGrid() {
    const designsData = [
        { id: 1, title: 'Business Card - Tech Startup', customer: 'Sarah Mitchell', date: 'Oct 24, 2025', status: 'pending', statusLabel: 'Pending Review', color: '#4FACFE' },
        { id: 2, title: 'Flyer - Grand Opening', customer: 'James Chen', date: 'Oct 23, 2025', status: 'approved', statusLabel: 'Approved', color: '#667EEA' },
        { id: 3, title: 'Banner - Summer Sale', customer: 'Alex Rivera', date: 'Oct 22, 2025', status: 'revision', statusLabel: 'Needs Revision', color: '#F093FB' },
        { id: 4, title: 'Brochure - Product Catalog', customer: 'Lisa Kim', date: 'Oct 21, 2025', status: 'approved', statusLabel: 'Approved', color: '#FCD34D' },
        { id: 5, title: 'Poster - Event Promotion', customer: 'Michael Torres', date: 'Oct 20, 2025', status: 'pending', statusLabel: 'Pending Review', color: '#F97316' },
        { id: 6, title: 'Business Card - Restaurant', customer: 'Emily Davis', date: 'Oct 19, 2025', status: 'approved', statusLabel: 'Approved', color: '#10B981' }
    ];

    const designGrid = document.getElementById('designGrid');
    if (!designGrid) return;

    const statusClasses = {
        'pending': 'status-pending',
        'approved': 'status-approved',
        'revision': 'status-revision'
    };

    designGrid.innerHTML = designsData.map(design => `
        <div class="design-card">
            <div class="design-thumbnail" style="background: linear-gradient(135deg, ${design.color} 0%, ${design.color}99 100%);">
                <span class="design-status-badge badge ${statusClasses[design.status]}">${design.statusLabel}</span>
            </div>
            <div class="design-info">
                <div class="design-title">${design.title}</div>
                <div class="design-meta">
                    <span>${design.customer}</span>
                    <span>${design.date}</span>
                </div>
                <div class="design-actions">
                    <button class="btn-secondary-small" style="flex: 1;">View</button>
                    ${design.status === 'pending' ? '<button class="btn-primary" style="flex: 1; font-size: 0.85rem; padding: 8px;">Approve</button>' : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Production Pipeline
function populateProductionPipeline() {
    const queueItems = [
        { id: '#PRD-2134', title: 'Business Cards (500)', customer: 'Sarah Mitchell' },
        { id: '#PRD-2133', title: 'Flyers A5 (1000)', customer: 'James Chen' },
        { id: '#PRD-2132', title: 'Posters A3 (100)', customer: 'Michael Torres' }
    ];

    const progressItems = [
        { id: '#PRD-2131', title: 'Banners 2x6 ft (3)', customer: 'Alex Rivera' },
        { id: '#PRD-2130', title: 'Brochures A4 (250)', customer: 'Lisa Kim' }
    ];

    const qualityItems = [
        { id: '#PRD-2129', title: 'Business Cards (1000)', customer: 'Emily Davis' },
        { id: '#PRD-2128', title: 'Stickers Custom (2000)', customer: 'Sophie Wilson' }
    ];

    const readyItems = [
        { id: '#PRD-2127', title: 'Flyers A4 (500)', customer: 'David Brown' },
        { id: '#PRD-2126', title: 'Posters A2 (50)', customer: 'Robert Johnson' }
    ];

    populateStage('queueStage', queueItems);
    populateStage('progressStage', progressItems);
    populateStage('qualityStage', qualityItems);
    populateStage('readyStage', readyItems);
}

function populateStage(stageId, items) {
    const stage = document.getElementById(stageId);
    if (!stage) return;

    stage.innerHTML = items.map(item => `
        <div class="production-item">
            <div class="production-item-header">
                <span class="production-item-id">${item.id}</span>
            </div>
            <div class="production-item-title">${item.title}</div>
            <div class="production-item-meta">${item.customer}</div>
        </div>
    `).join('');
}

// Customers Table
function populateCustomersTable() {
    const customersData = [
        { name: 'Sarah Mitchell', initials: 'SM', email: 'sarah.m@techstart.com', phone: '+1 (555) 123-4567', spend: 12450.00, orders: 28, lastContact: 'Oct 24, 2025', status: 'active' },
        { name: 'James Chen', initials: 'JC', email: 'james@quickprint.io', phone: '+1 (555) 234-5678', spend: 8920.00, orders: 18, lastContact: 'Oct 23, 2025', status: 'active' },
        { name: 'Alex Rivera', initials: 'AR', email: 'alex.r@designstudio.com', phone: '+1 (555) 345-6789', spend: 15680.00, orders: 42, lastContact: 'Oct 22, 2025', status: 'active' },
        { name: 'Lisa Kim', initials: 'LK', email: 'lisa@printflow.com', phone: '+1 (555) 456-7890', spend: 6250.00, orders: 15, lastContact: 'Oct 21, 2025', status: 'active' },
        { name: 'Michael Torres', initials: 'MT', email: 'm.torres@business.com', phone: '+1 (555) 567-8901', spend: 9340.00, orders: 22, lastContact: 'Oct 20, 2025', status: 'active' }
    ];

    const tableBody = document.getElementById('customersTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = customersData.map(customer => `
        <tr>
            <td>
                <div class="customer-cell">
                    <img src="data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%234FACFE'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3E${customer.initials}%3C/text%3E%3C/svg%3E" alt="${customer.name}">
                    <span>${customer.name}</span>
                </div>
            </td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td><strong>$${customer.spend.toLocaleString()}</strong></td>
            <td>${customer.orders}</td>
            <td>${customer.lastContact}</td>
            <td><span class="badge status-active">Active</span></td>
            <td>
                <button class="btn-icon" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// Campaigns List
function populateCampaignsList() {
    const campaignsData = [
        { name: 'Spring Sale 2025', type: 'Email', sent: 'Oct 20, 2025', opens: 1248, rate: 42.5 },
        { name: 'New Product Launch', type: 'SMS', sent: 'Oct 15, 2025', opens: 856, rate: 68.3 },
        { name: 'Customer Appreciation', type: 'Email', sent: 'Oct 10, 2025', opens: 2145, rate: 38.7 },
        { name: 'Flash Sale Weekend', type: 'Social', sent: 'Oct 5, 2025', opens: 3420, rate: 15.2 }
    ];

    const campaignsList = document.getElementById('campaignsList');
    if (!campaignsList) return;

    campaignsList.innerHTML = campaignsData.map(campaign => `
        <div class="campaign-list-item">
            <div class="campaign-list-info">
                <h4>${campaign.name}</h4>
                <p>${campaign.type} • Sent ${campaign.sent}</p>
            </div>
            <div class="campaign-list-stats">
                <div class="campaign-stat-value">${campaign.rate}%</div>
                <div class="campaign-stat-label">${campaign.opens.toLocaleString()} opens</div>
            </div>
        </div>
    `).join('');
}

// Invoices Table
function populateInvoicesTable() {
    const invoicesData = [
        { id: '#INV-5678', customer: 'Sarah Mitchell', initials: 'SM', issueDate: 'Oct 24, 2025', dueDate: 'Nov 08, 2025', amount: 245.00, status: 'pending' },
        { id: '#INV-5677', customer: 'James Chen', initials: 'JC', issueDate: 'Oct 23, 2025', dueDate: 'Nov 07, 2025', amount: 680.00, status: 'paid' },
        { id: '#INV-5676', customer: 'Alex Rivera', initials: 'AR', issueDate: 'Oct 22, 2025', dueDate: 'Nov 06, 2025', amount: 450.00, status: 'paid' },
        { id: '#INV-5675', customer: 'Lisa Kim', initials: 'LK', issueDate: 'Oct 21, 2025', dueDate: 'Oct 25, 2025', amount: 385.00, status: 'overdue' },
        { id: '#INV-5674', customer: 'Michael Torres', initials: 'MT', issueDate: 'Oct 20, 2025', dueDate: 'Nov 04, 2025', amount: 320.00, status: 'pending' }
    ];

    const tableBody = document.getElementById('invoicesTableBody');
    if (!tableBody) return;

    const statusClasses = {
        'pending': 'status-pending',
        'paid': 'status-completed',
        'overdue': 'status-revision'
    };

    const statusLabels = {
        'pending': 'Pending',
        'paid': 'Paid',
        'overdue': 'Overdue'
    };

    tableBody.innerHTML = invoicesData.map(invoice => `
        <tr>
            <td><span class="text-mono">${invoice.id}</span></td>
            <td>
                <div class="customer-cell">
                    <img src="data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%234FACFE'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3E${invoice.initials}%3C/text%3E%3C/svg%3E" alt="${invoice.customer}">
                    <span>${invoice.customer}</span>
                </div>
            </td>
            <td>${invoice.issueDate}</td>
            <td>${invoice.dueDate}</td>
            <td><strong>$${invoice.amount.toFixed(2)}</strong></td>
            <td><span class="badge ${statusClasses[invoice.status]}">${statusLabels[invoice.status]}</span></td>
            <td>
                <button class="btn-icon" title="View">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// Interactive Elements
document.addEventListener('click', (e) => {
    // Handle button clicks with notifications
    if (e.target.closest('.btn-primary') || e.target.closest('.btn-secondary')) {
        const button = e.target.closest('.btn-primary') || e.target.closest('.btn-secondary');
        const buttonText = button.textContent.trim();
        
        // Skip if it's the approve button or other specific actions
        if (buttonText === 'Approve' || buttonText === 'View') {
            showNotification(`${buttonText} action triggered`, 'info');
        }
    }
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Log initialization
console.log('✅ Dashboard initialized successfully');
console.log('📊 Charts loaded');
console.log('📋 Data populated');
console.log('🎨 Let\'s Print - Business Owner Dashboard Ready');
