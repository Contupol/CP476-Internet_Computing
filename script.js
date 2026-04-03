// Mock Data for innitial testing - Please replace with actual database calls in the future
let users = [
    { email: "test@easybudget.com", password: "123" }
];

let expenses = [
    { type: 'Food', value: 150, name: 'Charcoal Steakhouse', date: '2026-01-01' },
    { type: 'Transport', value: 200, name: 'Bus Pass', date: '2026-01-01' },
    { type: 'Other', value: 50, name: 'Donation', date: '2026-01-01' },
    { type: 'Gaming', value: 70, name: 'Steam Card', date: '2026-01-01' },
    { type: 'Rent', value: 220, name: 'Rent', date: '2026-01-01' },
    { type: 'Food', value: 20, name: 'Burger King', date: '2026-01-01' },
    { type: 'School', value: 150, name: 'Science Book', date: '2026-01-01' },
];

let Budget = 1200;

function loginDisplay() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function SignupDisplay() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function secondPage() {
    window.location.href = "index.php?page=second";
}

function thirdPage() {
    window.location.href = "index.php?page=settings";
}

const ctx = document.getElementById('budgetChart').getContext('2d');

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
    const totalSpent = expenses.reduce((sum, item) => sum + item.value, 0);
    const remaining = Budget - totalSpent;

    pieChart.data.datasets[0].data = [totalSpent, remaining > 0 ? remaining : 0];
    pieChart.update();

    const summaryList = document.querySelector('.summary-list');
    if (summaryList) {
        const totalsByType = expenses.reduce((acc, item) => {
            acc[item.type] = (acc[item.type] || 0) + item.value;
            return acc;
        }, {});

        summaryList.innerHTML = Object.keys(totalsByType).map(type => `
            <li>
                <span>${type}</span>
                <span>$${totalsByType[type]}</span>
            </li>
        `).join('');
    }


    const tbody = document.getElementById('expense-tbody');
    if (tbody) {
        tbody.innerHTML = expenses.map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>$${item.value}</td>
                <td>${item.date}</td>
                <td>
                    <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}
dashboardUpdate();


function handleLogin() {
    const email = document.getElementById('sign-up-email').value; 
    const pass = document.getElementById('sign-up-password').value;

    const user = users.find(u => u.email === email && u.password === pass);

    if (user) {
        secondPage(); 
    } else {
        alert("Invalid email or password.");
    }
}

function handleSignup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('userPassword').value;
    const confirm = document.getElementById('userPasswordc').value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    users.push({ email: email, password: password });
    alert("Account created! You can now log in.");
    loginDisplay();
}