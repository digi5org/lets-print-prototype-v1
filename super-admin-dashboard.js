'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    initializeNavigation();
    initializeCharts();
    populateOverview();
    populateTenants();
    populateAlerts();
    populateIncidents();
    populateBilling();
    populateSupport();
    populateAccessRequests();
    populateAuditLog();
    populateRoleActivity();
    wireActions();
});

function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');

    if (!sidebarToggle || !sidebar) {
        return;
    }

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

function initializeNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();

            menuItems.forEach(link => link.classList.remove('active'));
            item.classList.add('active');

            const selectedView = item.getAttribute('data-view');
            document.querySelectorAll('.view').forEach(view => {
                view.classList.toggle('active', view.id === `${selectedView}View`);
            });

            if (window.innerWidth < 1024) {
                const sidebar = document.getElementById('sidebar');
                sidebar?.classList.remove('open');
            }
        });
    });
}

function initializeCharts() {
    const tenantGrowthCanvas = document.getElementById('tenantGrowthChart');
    if (tenantGrowthCanvas) {
        new Chart(tenantGrowthCanvas, {
            type: 'line',
            data: {
                labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [{
                    label: 'Total Tenants',
                    data: [76, 81, 88, 95, 102, 108, 113, 119, 122, 124, 127, 128],
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.12)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: false,
                        suggestedMin: 70,
                        suggestedMax: 140,
                        ticks: { callback: value => `${value}` }
                    }
                }
            }
        });
    }

    const planDistributionCanvas = document.getElementById('planDistributionChart');
    if (planDistributionCanvas) {
        new Chart(planDistributionCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Enterprise', 'Professional', 'Starter'],
                datasets: [{
                    data: [58, 172, 57],
                    backgroundColor: ['#8B5CF6', '#2563EB', '#F59E0B'],
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { boxWidth: 12, padding: 10 }
                    }
                }
            }
        });
    }
}

function populateOverview() {
    const snapshotRows = [
        {
            tenant: 'PrintHub Pro',
            initials: 'PH',
            plan: 'Enterprise',
            users: 184,
            mrr: 18240,
            status: 'Active',
            health: 'Excellent'
        },
        {
            tenant: 'QuickPrint Solutions',
            initials: 'QS',
            plan: 'Professional',
            users: 96,
            mrr: 8240,
            status: 'Churn Risk',
            health: 'Watchlist'
        },
        {
            tenant: 'DesignPrint Studio',
            initials: 'DS',
            plan: 'Enterprise',
            users: 205,
            mrr: 21480,
            status: 'Active',
            health: 'Excellent'
        },
        {
            tenant: 'PrintFlow',
            initials: 'PF',
            plan: 'Professional',
            users: 72,
            mrr: 6180,
            status: 'Trial',
            health: 'Onboarding'
        },
        {
            tenant: 'Stencil Labs',
            initials: 'SL',
            plan: 'Starter',
            users: 24,
            mrr: 980,
            status: 'Active',
            health: 'Good'
        }
    ];

    const snapshotTableBody = document.getElementById('snapshotTableBody');
    if (snapshotTableBody) {
        snapshotTableBody.innerHTML = snapshotRows.map(row => `
            <tr>
                <td>
                    <div class="customer-cell">
                        <img src="data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3E${row.initials}%3C/text%3E%3C/svg%3E" alt="${row.tenant}">
                        <span>${row.tenant}</span>
                    </div>
                </td>
                <td>${row.plan}</td>
                <td>${row.users}</td>
                <td><strong>$${row.mrr.toLocaleString()}</strong></td>
                <td><span class="badge ${badgeClassForStatus(row.status)}">${row.status}</span></td>
                <td><span class="badge ${badgeClassForHealth(row.health)}">${row.health}</span></td>
            </tr>
        `).join('');
    }

    const actions = [
        { title: 'SOC2 Type II Renewal', detail: 'External audit starts Nov 15' },
        { title: 'Tenant Council Briefing', detail: 'Agenda review due Nov 02' },
        { title: 'Billing Reconciliation', detail: 'Finalize usage adjustments by Nov 05' }
    ];

    const upcomingContainer = document.getElementById('upcomingActions');
    if (upcomingContainer) {
        upcomingContainer.innerHTML = actions.map(action => `
            <div class="campaign-list-item">
                <div class="campaign-list-info">
                    <h4>${action.title}</h4>
                    <p>${action.detail}</p>
                </div>
                <div class="campaign-list-stats">
                    <div class="campaign-stat-value">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 6v6l3 2"/>
                        </svg>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function populateTenants() {
    const tenants = [
        {
            tenant: 'PrintHub Pro',
            initials: 'PH',
            plan: 'Enterprise',
            users: 184,
            lastActivity: 'Oct 27, 2025 09:42 UTC',
            mrr: 18240,
            status: 'Active',
            health: 'Excellent'
        },
        {
            tenant: 'QuickPrint Solutions',
            initials: 'QS',
            plan: 'Professional',
            users: 96,
            lastActivity: 'Oct 27, 2025 09:05 UTC',
            mrr: 8240,
            status: 'Churn Risk',
            health: 'Watchlist'
        },
        {
            tenant: 'DesignPrint Studio',
            initials: 'DS',
            plan: 'Enterprise',
            users: 205,
            lastActivity: 'Oct 27, 2025 08:58 UTC',
            mrr: 21480,
            status: 'Active',
            health: 'Excellent'
        },
        {
            tenant: 'PrintFlow',
            initials: 'PF',
            plan: 'Professional',
            users: 72,
            lastActivity: 'Oct 26, 2025 22:41 UTC',
            mrr: 6180,
            status: 'Trial',
            health: 'Onboarding'
        },
        {
            tenant: 'Stencil Labs',
            initials: 'SL',
            plan: 'Starter',
            users: 24,
            lastActivity: 'Oct 26, 2025 18:03 UTC',
            mrr: 980,
            status: 'Active',
            health: 'Good'
        },
        {
            tenant: 'Northwind Print',
            initials: 'NP',
            plan: 'Enterprise',
            users: 164,
            lastActivity: 'Oct 27, 2025 07:51 UTC',
            mrr: 17860,
            status: 'Active',
            health: 'Excellent'
        }
    ];

    const tenantTableBody = document.getElementById('tenantTableBody');
    if (tenantTableBody) {
        tenantTableBody.innerHTML = tenants.map(row => `
            <tr>
                <td>
                    <div class="customer-cell">
                        <img src="data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%238B5CF6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3E${row.initials}%3C/text%3E%3C/svg%3E" alt="${row.tenant}">
                        <span>${row.tenant}</span>
                    </div>
                </td>
                <td>${row.plan}</td>
                <td>${row.users}</td>
                <td>${row.lastActivity}</td>
                <td><strong>$${row.mrr.toLocaleString()}</strong></td>
                <td><span class="badge ${badgeClassForStatus(row.status)}">${row.status}</span></td>
                <td><span class="badge ${badgeClassForHealth(row.health)}">${row.health}</span></td>
                <td>
                    <button class="btn-icon" title="Open">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 21H3V3"/>
                            <path d="M9 9h12v12"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function populateAlerts() {
    const alerts = [
        {
            title: 'US-East latency warning',
            detail: 'p95 latency breached 220 ms for 6 minutes',
            severity: 'warning'
        },
        {
            title: 'Billing webhook retries increased',
            detail: 'Stripe retries exceeded baseline (42 retries)',
            severity: 'info'
        },
        {
            title: 'Tenant QuickPrint Solutions flagged',
            detail: 'Usage drop 32% WoW, churn playbook suggested',
            severity: 'critical'
        }
    ];

    const alertFeed = document.getElementById('alertFeed');
    if (alertFeed) {
        alertFeed.innerHTML = alerts.map(alert => `
            <div class="campaign-list-item">
                <div class="campaign-list-info">
                    <h4>${alert.title}</h4>
                    <p>${alert.detail}</p>
                </div>
                <div class="campaign-list-stats">
                    <span class="badge ${badgeClassForSeverity(alert.severity)}">${alert.severity.toUpperCase()}</span>
                </div>
            </div>
        `).join('');
    }
}

function populateIncidents() {
    const incidents = [
        {
            title: 'INC-2045 Latency spike - US-East',
            opened: 'Opened 7m ago',
            status: 'Investigating'
        },
        {
            title: 'INC-2044 Printing queue delay - EU-Central',
            opened: 'Resolved 2h ago',
            status: 'Resolved'
        },
        {
            title: 'INC-2043 Partner webhook failures',
            opened: 'Postmortem draft due Oct 30',
            status: 'Postmortem'
        }
    ];

    const incidentTimeline = document.getElementById('incidentTimeline');
    if (incidentTimeline) {
        incidentTimeline.innerHTML = incidents.map(incident => `
            <div class="campaign-list-item">
                <div class="campaign-list-info">
                    <h4>${incident.title}</h4>
                    <p>${incident.opened}</p>
                </div>
                <div class="campaign-list-stats">
                    <span class="badge ${badgeClassForIncident(incident.status)}">${incident.status}</span>
                </div>
            </div>
        `).join('');
    }
}

function populateRoleActivity() {
    const businessOwnerEvents = [
        {
            name: 'Sarah Mitchell',
            tenant: 'PrintHub Pro',
            action: 'Updated storefront pricing tier for brochures',
            timestamp: 'Oct 27, 2025 • 09:12 UTC',
            detail: 'Adjustment moves brochure premium pack to $489'
        },
        {
            name: 'James Chen',
            tenant: 'QuickPrint Solutions',
            action: 'Reviewed quarterly revenue report export',
            timestamp: 'Oct 27, 2025 • 08:46 UTC',
            detail: 'No changes recorded • export downloaded'
        },
        {
            name: 'Lisa Kim',
            tenant: 'DesignPrint Studio',
            action: 'Triggered client onboarding campaign email blast',
            timestamp: 'Oct 26, 2025 • 22:05 UTC',
            detail: 'Campaign sent to 142 inactive clients'
        }
    ];

    const productionOwnerEvents = [
        {
            name: 'Daniel Harper',
            tenant: 'PrintHub Pro',
            action: 'Advanced 12 jobs from Queue to In Progress',
            timestamp: 'Oct 27, 2025 • 09:21 UTC',
            detail: 'Included high-priority banner run for TechCon'
        },
        {
            name: 'Priya Natarajan',
            tenant: 'QuickPrint Solutions',
            action: 'Acknowledged maintenance alert on UV press #3',
            timestamp: 'Oct 27, 2025 • 07:58 UTC',
            detail: 'Scheduled follow-up for Oct 28, 07:00 UTC'
        },
        {
            name: 'Miguel Alvarez',
            tenant: 'Stencil Labs',
            action: 'Approved proof for custom die-cut stickers',
            timestamp: 'Oct 26, 2025 • 18:32 UTC',
            detail: 'Proof version 3 routed to print queue'
        }
    ];

    const businessContainer = document.getElementById('businessOwnerActivity');
    if (businessContainer) {
        businessContainer.innerHTML = businessOwnerEvents.map(event => buildActivityItem(event)).join('');
    }

    const productionContainer = document.getElementById('productionOwnerActivity');
    if (productionContainer) {
        productionContainer.innerHTML = productionOwnerEvents.map(event => buildActivityItem(event)).join('');
    }
}

function buildActivityItem(event) {
    return `
        <div class="campaign-list-item">
            <div class="campaign-list-info">
                <h4>${event.name} • ${event.tenant}</h4>
                <p>${event.action}</p>
                <p>${event.detail}</p>
            </div>
            <div class="campaign-list-stats">
                <div class="campaign-stat-label">${event.timestamp}</div>
            </div>
        </div>
    `;
}

function populateBilling() {
    const invoices = [
        {
            id: '#INV-8721',
            tenant: 'PrintHub Pro',
            initials: 'PH',
            issued: 'Oct 01, 2025',
            due: 'Oct 15, 2025',
            amount: 18240,
            status: 'Paid'
        },
        {
            id: '#INV-8722',
            tenant: 'QuickPrint Solutions',
            initials: 'QS',
            issued: 'Oct 01, 2025',
            due: 'Oct 15, 2025',
            amount: 8240,
            status: 'Overdue'
        },
        {
            id: '#INV-8723',
            tenant: 'DesignPrint Studio',
            initials: 'DS',
            issued: 'Oct 01, 2025',
            due: 'Oct 15, 2025',
            amount: 21480,
            status: 'Paid'
        },
        {
            id: '#INV-8724',
            tenant: 'PrintFlow',
            initials: 'PF',
            issued: 'Oct 12, 2025',
            due: 'Oct 26, 2025',
            amount: 6180,
            status: 'Pending'
        },
        {
            id: '#INV-8725',
            tenant: 'Stencil Labs',
            initials: 'SL',
            issued: 'Oct 18, 2025',
            due: 'Nov 01, 2025',
            amount: 980,
            status: 'Pending'
        }
    ];

    const billingTableBody = document.getElementById('billingTableBody');
    if (billingTableBody) {
        billingTableBody.innerHTML = invoices.map(invoice => `
            <tr>
                <td><span class="text-mono">${invoice.id}</span></td>
                <td>
                    <div class="customer-cell">
                        <img src="data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%23F59E0B'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='14' font-family='Arial'%3E${invoice.initials}%3C/text%3E%3C/svg%3E" alt="${invoice.tenant}">
                        <span>${invoice.tenant}</span>
                    </div>
                </td>
                <td>${invoice.issued}</td>
                <td>${invoice.due}</td>
                <td><strong>$${invoice.amount.toLocaleString()}</strong></td>
                <td><span class="badge ${badgeClassForInvoice(invoice.status)}">${invoice.status}</span></td>
                <td>
                    <button class="btn-icon" title="View Invoice">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M8 6h13"/>
                            <path d="M8 12h13"/>
                            <path d="M8 18h13"/>
                            <path d="M3 6h.01"/>
                            <path d="M3 12h.01"/>
                            <path d="M3 18h.01"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function populateSupport() {
    const tickets = [
        {
            id: 'SUP-1098',
            tenant: 'QuickPrint Solutions',
            priority: 'Critical',
            opened: 'Oct 27, 08:14 UTC',
            owner: 'T. Alvarez',
            status: 'In Progress',
            sla: 'Response due in 22m'
        },
        {
            id: 'SUP-1097',
            tenant: 'PrintFlow',
            priority: 'High',
            opened: 'Oct 26, 21:33 UTC',
            owner: 'H. Patel',
            status: 'Awaiting Tenant',
            sla: 'Due in 4h'
        },
        {
            id: 'SUP-1096',
            tenant: 'Stencil Labs',
            priority: 'Medium',
            opened: 'Oct 26, 11:05 UTC',
            owner: 'G. Chen',
            status: 'Monitoring',
            sla: 'On track'
        }
    ];

    const supportTableBody = document.getElementById('supportTableBody');
    if (supportTableBody) {
        supportTableBody.innerHTML = tickets.map(ticket => `
            <tr>
                <td><span class="text-mono">${ticket.id}</span></td>
                <td>${ticket.tenant}</td>
                <td><span class="badge ${badgeClassForPriority(ticket.priority)}">${ticket.priority}</span></td>
                <td>${ticket.opened}</td>
                <td>${ticket.owner}</td>
                <td><span class="badge ${badgeClassForStatus(ticket.status)}">${ticket.status}</span></td>
                <td>${ticket.sla}</td>
            </tr>
        `).join('');
    }
}

function populateAccessRequests() {
    const requests = [
        {
            user: 'Rita Morales',
            tenant: 'DesignPrint Studio',
            role: 'Tenant Admin',
            reason: 'Lead admin out of office - coverage needed',
            requested: 'Oct 27, 2025 07:18 UTC',
            status: 'Pending'
        },
        {
            user: 'Liam O\'Brien',
            tenant: 'QuickPrint Solutions',
            role: 'Billing Analyst',
            reason: 'Review disputed invoices',
            requested: 'Oct 26, 2025 19:02 UTC',
            status: 'Escalated'
        },
        {
            user: 'Fatima Alvi',
            tenant: 'PrintHub Pro',
            role: 'Support Manager',
            reason: 'Temporary access for migration project',
            requested: 'Oct 26, 2025 15:44 UTC',
            status: 'Approved'
        }
    ];

    const accessTableBody = document.getElementById('accessTableBody');
    if (accessTableBody) {
        accessTableBody.innerHTML = requests.map(request => `
            <tr>
                <td>${request.user}</td>
                <td>${request.tenant}</td>
                <td>${request.role}</td>
                <td>${request.reason}</td>
                <td>${request.requested}</td>
                <td><span class="badge ${badgeClassForStatus(request.status)}">${request.status}</span></td>
                <td>
                    <div class="button-group">
                        <button class="btn-secondary-small">Approve</button>
                        <button class="btn-secondary-small">Deny</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function populateAuditLog() {
    const entries = [
        {
            timestamp: '2025-10-27 09:32 UTC',
            user: 'avery.singh',
            action: 'Updated feature flag',
            scope: 'AI Proof Assistant',
            location: '66.102.0.0 / SF, USA',
            status: 'Success'
        },
        {
            timestamp: '2025-10-27 08:57 UTC',
            user: 'noc.oncall',
            action: 'Elevated incident severity',
            scope: 'INC-2045',
            location: '104.28.14.0 / Remote',
            status: 'Success'
        },
        {
            timestamp: '2025-10-27 08:11 UTC',
            user: 'billing.bot',
            action: 'Generated invoice batch',
            scope: 'Cycle #2025-10',
            location: '10.20.4.8 / Internal',
            status: 'Success'
        },
        {
            timestamp: '2025-10-27 07:44 UTC',
            user: 'security.ops',
            action: 'Adjusted retention policy',
            scope: 'Audit logs',
            location: '35.186.0.0 / Dublin, IE',
            status: 'Pending Review'
        }
    ];

    const auditTableBody = document.getElementById('auditTableBody');
    if (auditTableBody) {
        auditTableBody.innerHTML = entries.map(entry => `
            <tr>
                <td>${entry.timestamp}</td>
                <td>${entry.user}</td>
                <td>${entry.action}</td>
                <td>${entry.scope}</td>
                <td>${entry.location}</td>
                <td><span class="badge ${badgeClassForStatus(entry.status)}">${entry.status}</span></td>
            </tr>
        `).join('');
    }
}

function wireActions() {
    const commandCenterBtn = document.getElementById('commandCenterBtn');
    commandCenterBtn?.addEventListener('click', () => showToast('Command Center launching in a new window'));

    const muteAlertsBtn = document.getElementById('muteAlertsBtn');
    muteAlertsBtn?.addEventListener('click', () => showToast('Alerts muted for 60 minutes', 'info'));

    const bulkApproveBtn = document.getElementById('bulkApproveBtn');
    bulkApproveBtn?.addEventListener('click', () => showToast('Bulk approval workflow triggered', 'success'));

    const runBillingCycle = document.getElementById('runBillingCycle');
    runBillingCycle?.addEventListener('click', () => showToast('Billing cycle initiated for all tenants', 'success'));

    const createIncidentBtn = document.getElementById('createIncidentBtn');
    createIncidentBtn?.addEventListener('click', () => showToast('Incident creation dialog opened', 'info'));

    const activityRoleFilter = document.getElementById('activityRoleFilter');
    activityRoleFilter?.addEventListener('change', () => showToast('Role filter is informational in the prototype', 'info'));

    const activityRangeFilter = document.getElementById('activityRangeFilter');
    activityRangeFilter?.addEventListener('change', () => showToast('Time-range filter is informational in the prototype', 'info'));
}

function badgeClassForStatus(status) {
    const normalized = status.toLowerCase();
    if (normalized.includes('active') || normalized.includes('success') || normalized.includes('approved')) {
        return 'status-completed';
    }
    if (normalized.includes('pending') || normalized.includes('trial') || normalized.includes('await')) {
        return 'status-pending';
    }
    if (normalized.includes('risk') || normalized.includes('watch') || normalized.includes('escalated')) {
        return 'status-revision';
    }
    if (normalized.includes('progress')) {
        return 'status-production';
    }
    if (normalized.includes('suspended') || normalized.includes('overdue')) {
        return 'status-production';
    }
    if (normalized.includes('monitoring')) {
        return 'status-shipped';
    }
    return 'status-pending';
}

function badgeClassForHealth(health) {
    const normalized = health.toLowerCase();
    if (normalized.includes('excellent') || normalized.includes('healthy')) {
        return 'status-completed';
    }
    if (normalized.includes('good')) {
        return 'status-production';
    }
    if (normalized.includes('watch') || normalized.includes('onboarding')) {
        return 'status-pending';
    }
    return 'status-revision';
}

function badgeClassForSeverity(severity) {
    switch (severity) {
        case 'critical':
            return 'status-revision';
        case 'warning':
            return 'status-production';
        default:
            return 'status-shipped';
    }
}

function badgeClassForIncident(status) {
    const normalized = status.toLowerCase();
    if (normalized.includes('investigating')) {
        return 'status-production';
    }
    if (normalized.includes('resolved')) {
        return 'status-completed';
    }
    if (normalized.includes('postmortem')) {
        return 'status-pending';
    }
    return 'status-shipped';
}

function badgeClassForInvoice(status) {
    const normalized = status.toLowerCase();
    if (normalized === 'paid') {
        return 'status-completed';
    }
    if (normalized === 'pending') {
        return 'status-pending';
    }
    return 'status-revision';
}

function badgeClassForPriority(priority) {
    const normalized = priority.toLowerCase();
    if (normalized === 'critical') {
        return 'status-revision';
    }
    if (normalized === 'high') {
        return 'status-production';
    }
    return 'status-pending';
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.top = '92px';
    toast.style.right = '24px';
    toast.style.padding = '16px 24px';
    toast.style.borderRadius = '12px';
    toast.style.color = '#fff';
    toast.style.fontWeight = '600';
    toast.style.zIndex = '10000';
    toast.style.boxShadow = '0 10px 18px rgba(15, 23, 42, 0.18)';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(140px)';
    toast.style.transition = 'all 0.25s ease';

    if (type === 'info') {
        toast.style.background = '#2563EB';
    } else if (type === 'success') {
        toast.style.background = '#10B981';
    } else {
        toast.style.background = '#F59E0B';
    }

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(140px)';
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 2800);
}
