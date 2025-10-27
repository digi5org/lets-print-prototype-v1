// Demo JS for production owner dashboard
// - view switching
// - sample data population
// - small Chart.js examples

(() => {
    const views = document.querySelectorAll('.view');
    const menuItems = document.querySelectorAll('.menu-item');

    function showView(name) {
        views.forEach(v => v.classList.remove('active'));
        const el = document.getElementById(name + 'View');
        if (el) el.classList.add('active');
        // highlight menu
        menuItems.forEach(mi => mi.classList.toggle('active', mi.dataset.view === name));
    }

    // wire menu links
    menuItems.forEach(mi => {
        mi.addEventListener('click', (e) => {
            e.preventDefault();
            const view = mi.dataset.view;
            showView(view);
        });
    });

    // global search filter (simple)
    document.getElementById('globalSearch').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        // simple highlight: if any order contains q, show orders view
        if (q.length > 2) document.querySelector('[data-view="orders"]').click();
    });

    // Sample demo data
    const sampleOrders = [
        {id: 'ORD-1001', client: 'Acme Corp', partner: 'Startup A', product: 'Poster', qty: 50, status: 'pending', payment: 'due', amount: 150.00, date: '2025-10-27'},
        {id: 'ORD-1002', client: 'Bella Ltd', partner: '', product: 'ID Card', qty: 200, status: 'in_progress', payment: 'partial', amount: 320.00, date: '2025-10-27'},
        {id: 'ORD-1003', client: 'Carter', partner: 'Startup B', product: 'Banner', qty: 2, status: 'printed', payment: 'paid', amount: 85.00, date: '2025-10-26'},
        {id: 'ORD-1004', client: 'Delta', partner: '', product: 'Brochure', qty: 100, status: 'delivered', payment: 'paid', amount: 420.00, date: '2025-10-25'},
        {id: 'ORD-1005', client: 'Echo', partner: 'Startup A', product: 'Poster', qty: 10, status: 'pending', payment: 'due', amount: 30.00, date: '2025-10-27'}
    ];

    function formatCurrency(v) { return '$' + v.toFixed(2); }

    // Populate recent orders on overview
    function populateRecentOrders() {
        const tbody = document.getElementById('recentOrdersTbody');
        tbody.innerHTML = '';
        sampleOrders.slice(0,5).forEach(o => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${o.id}</td>
                <td>${o.client}</td>
                <td>${o.product}</td>
                <td>${o.qty}</td>
                <td><span class="badge status-${o.status}">${o.status.replace('_',' ')}</span></td>
                <td>${o.payment}</td>
                <td class="table-actions">
                    <button class="btn-secondary-small" onclick="viewOrder('${o.id}')">View</button>
                    <button class="btn-secondary-small" onclick="printSlip('${o.id}')">Print Slip</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Populate orders management table
    function populateOrdersTable() {
        const tbody = document.getElementById('ordersTableBody');
        tbody.innerHTML = '';
        sampleOrders.forEach(o => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input type="checkbox" data-order="${o.id}"></td>
                <td>${o.id}</td>
                <td>${o.client}</td>
                <td>${o.partner || '-'}</td>
                <td>${o.product}</td>
                <td>${o.qty}</td>
                <td><span class="badge status-${o.status}">${o.status.replace('_',' ')}</span></td>
                <td>${o.payment}</td>
                <td>
                    <button class="btn-secondary-small" onclick="viewOrder('${o.id}')">View</button>
                    <button class="btn-secondary-small" onclick="updateStatus('${o.id}')">Update</button>
                    <button class="btn-secondary-small" onclick="printSlip('${o.id}')">Print</button>
                    <button class="btn-secondary-small" onclick="deleteOrder('${o.id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Small stats aggregator for KPIs
    function updateKpis() {
        const total = sampleOrders.length;
        const pending = sampleOrders.filter(o => o.status === 'pending').length;
        const completed = sampleOrders.filter(o => o.status === 'delivered' || o.status === 'printed').length;
        const earnings = sampleOrders.reduce((s,o) => s + (o.amount||0), 0);
        const today = sampleOrders.filter(o => o.date === new Date().toISOString().slice(0,10)).length;
        const urgent = sampleOrders.filter(o => o.status === 'pending' && o.qty > 100).length;

        document.getElementById('kpiTotalOrders').textContent = total;
        document.getElementById('kpiPendingOrders').textContent = pending;
        document.getElementById('kpiCompletedOrders').textContent = completed;
        document.getElementById('kpiEarnings').textContent = formatCurrency(earnings);
        document.getElementById('kpiTodayOrders').textContent = today;
        document.getElementById('kpiUrgent').textContent = urgent;
    }

    // Actions (simple placeholders)
    window.viewOrder = function(id) { alert('View order ' + id + ' (placeholder)'); };
    window.printSlip = function(id) { alert('Print slip for ' + id + ' (placeholder)'); };
    window.updateStatus = function(id) { alert('Update status of ' + id + ' (placeholder)'); };
    window.deleteOrder = function(id) { if(confirm('Delete ' + id + '?')) alert('Deleted ' + id); };

    // Charts
    let ordersChart, statusChart, revenueChart, topProductsChart, turnaroundChart;

    function initCharts() {
        const ordersCtx = document.getElementById('ordersChart').getContext('2d');
        ordersChart = new Chart(ordersCtx, {
            type: 'bar',
            data: {
                labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                datasets: [{ label: 'Orders', data: [12, 19, 8, 14, 15, 10, 6], backgroundColor: '#2563EB' }]
            }
        });

        const statusCtx = document.getElementById('statusChart').getContext('2d');
        statusChart = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Pending','In Progress','Printed','Delivered','Canceled'],
                datasets: [{ data: [5, 8, 4, 6, 1], backgroundColor: ['#F59E0B','#3B82F6','#8B5CF6','#10B981','#EF4444'] }]
            }
        });

        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: { labels: ['Jan','Feb','Mar','Apr','May','Jun'], datasets: [{ label:'Revenue', data:[1200,1500,1100,1700,2200,2500], borderColor:'#2563EB', backgroundColor:'rgba(59,130,246,0.08)'}] }
        });

        const topCtx = document.getElementById('topProductsChart').getContext('2d');
        topProductsChart = new Chart(topCtx, { type: 'pie', data: { labels:['Poster','ID Card','Banner','Brochure'], datasets:[{data:[45,25,20,10], backgroundColor:['#2563EB','#10B981','#F97316','#8B5CF6'] }] } });

        const turnCtx = document.getElementById('turnaroundChart').getContext('2d');
        turnaroundChart = new Chart(turnCtx, { type: 'bar', data: { labels:['Queue','Print','Quality','Dispatch'], datasets:[{ label:'Avg Days', data:[1.2, 2.4, 0.8, 1.5], backgroundColor:'#6B7280' }] } });
    }

    // init
    populateRecentOrders();
    populateOrdersTable();
    updateKpis();
    initCharts();

    // sample inventory / products / team populations (simple)
    document.getElementById('productsTable').querySelector('tbody').innerHTML = `
        <tr><td>SKU-001</td><td>Poster</td><td>$3.00</td><td>Glossy Paper</td><td>2 days</td><td><button class="btn-secondary-small">Edit</button></td></tr>
        <tr><td>SKU-002</td><td>ID Card</td><td>$1.50</td><td>PVC</td><td>1 day</td><td><button class="btn-secondary-small">Edit</button></td></tr>
    `;

    document.getElementById('inventoryTable').querySelector('tbody').innerHTML = `
        <tr><td>A4 Paper</td><td>Paper</td><td>1500</td><td>$0.01</td><td><button class="btn-secondary-small">Adjust</button></td></tr>
        <tr><td>Black Ink</td><td>Ink</td><td>6</td><td>$20.00</td><td><button class="btn-secondary-small">Adjust</button></td></tr>
    `;

    document.getElementById('teamTable').innerHTML = `
        <tr><td>Ravi</td><td>Operator</td><td>8</td><td><button class="btn-secondary-small">Edit</button></td></tr>
        <tr><td>Anna</td><td>Quality</td><td>5</td><td><button class="btn-secondary-small">Edit</button></td></tr>
    `;

    // alerts
    document.getElementById('alertsList').innerHTML = `
        <div class="campaign-list-item"><div class="campaign-list-info"><h4>New order ORD-1006</h4><p class="muted">2 minutes ago</p></div><div class="campaign-list-stats"><span class="badge status-pending">New</span></div></div>
        <div class="campaign-list-item"><div class="campaign-list-info"><h4>Low stock: Black Ink</h4><p class="muted">1 hour ago</p></div><div class="campaign-list-stats"><span class="badge status-revision">Low</span></div></div>
    `;

})();
