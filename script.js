function loginDisplay() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function SignupDisplay() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function secondPage() {
    window.location.href = "secondPage.html";
}

const ctx = document.getElementById('budgetChart').getContext('2d');
let expenses = [
    { name: 'Food', amount: 150 },
    { name: 'Transport', amount: 200 },
    { name: 'Other', amount: 50 },
    { name: 'Gaming', amount: 70 },
    { name: 'Rent', amount: 220 },
    { name: 'School', amount: 150 },
    
];

let Budget = 1200;

const pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Money Spent', 'Remaining Budget'],
        datasets: [{
            label: 'Budget Overview',
            data: expenses,
            backgroundColor: ['red', 'green'],
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            }
        }
    }
});

function dashboardUpdate() {
    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
    const remaining = Budget - totalSpent;

    pieChart.data.datasets[0].data = [totalSpent, remaining > 0 ? remaining : 0];
    pieChart.update();

    const listContainer = document.querySelector('.expense-list');
    if (listContainer) {
        listContainer.innerHTML = expenses.map(item => `
                <li>
                    <span>${item.name}</span>
                    <span>$${item.amount}</span>
                </li>
            `).join('') +
            `</ul>`;
    }
}
dashboardUpdate();



