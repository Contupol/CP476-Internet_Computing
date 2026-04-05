// Mock Data for innitial testing - Please replace with actual database calls in the future
//[user, password, Budget, [expenses]]
let currentUserIndex = 0;
let currentBudgetIndex = 0;
let users = [
    {
        email: "test@easybudget.com",
        password: "123",
        budgets: [
            {
                bName: "Initial Savings Goal",
                description: "My first budget",
                totalAmt: 1200,
                period: "Monthly",
                expenses: [{ type: 'Food', value: 150, name: 'Charcoal Steakhouse', date: '2026-01-01' },
                { type: 'Transport', value: 200, name: 'Bus Pass', date: '2026-01-01' },
                { type: 'Other', value: 50, name: 'Donation', date: '2026-01-01' },
                { type: 'Gaming', value: 70, name: 'Steam Card', date: '2026-01-01' },
                { type: 'Rent', value: 220, name: 'Rent', date: '2026-01-01' },
                { type: 'Food', value: 20, name: 'Burger King', date: '2026-01-01' },
                { type: 'School', value: 150, name: 'Science Book', date: '2026-01-01' }]
            }
        ]
    }
];


let pieChart;
let savingsChart;

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

const chart = document.getElementById('budgetChart');

if (chart) {
    const ctx = chart.getContext('2d');
    const initialBudget = users[currentUserIndex].budgets[currentBudgetIndex];
    const initialSpent = initialBudget.expenses.reduce((sum, item) => sum + item.value, 0);
    const initialRemaining = initialBudget.totalAmt - initialSpent;

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Money Spent', 'Remaining Budget'],
            datasets: [{
                label: 'Budget Overview',
                data: [initialSpent, initialRemaining > 0 ? initialRemaining : 0], backgroundColor: ['red', 'green'],
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
}


function dashboardUpdate() {
    const summaryList = document.querySelector('.summary-list');
    if (!summaryList) return;

    const user = users[currentUserIndex];
    const activeBudget = user.budgets[currentBudgetIndex];
    const budgetExpenses = activeBudget.expenses;
    const budgetLimit = activeBudget.totalAmt;


    const totalSpent = budgetExpenses.reduce((sum, item) => sum + item.value, 0);
    const remaining = budgetLimit - totalSpent;

    if (pieChart) {
        pieChart.data.datasets[0].data = [totalSpent, remaining > 0 ? remaining : 0];
        pieChart.update();
    }

    if (summaryList) {
        const totalsByType = budgetExpenses.reduce((acc, item) => {
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
        tbody.innerHTML = budgetExpenses.map((item, index) => `
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

function addExpense() {
    const typeInput = document.getElementById('itemType');
    const dateInput = document.getElementById('itemDate');
    const valueInput = document.getElementById('itemValue');
    const nameInput = document.getElementById('itemName');

    if (!typeInput.value || !dateInput.value || !valueInput.value || !nameInput.value) {
        alert("Please fill in all fields to add an expense.");
        return;
    }

    const newExpense = {
        type: typeInput.value,
        value: parseFloat(valueInput.value),
        name: nameInput.value,
        date: dateInput.value
    };

    users[currentUserIndex].budgets[currentBudgetIndex].expenses.push(newExpense);

    typeInput.value = '';
    dateInput.value = '';
    valueInput.value = '';
    nameInput.value = '';

    dashboardUpdate();
}

function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this expense?")) {
        const activeBudget = users[currentUserIndex].budgets[currentBudgetIndex];

        activeBudget.expenses.splice(index, 1);
        dashboardUpdate();
        savingsChart.destroy();
        initSavingsChart();
    }
}

let editIndex = null;

function editExpense(index) {
    const activeExpenses = users[currentUserIndex].budgets[currentBudgetIndex].expenses;
    const item = activeExpenses[index];

    editIndex = index;

    document.getElementById('itemType').value = item.type;
    document.getElementById('itemDate').value = item.date;
    document.getElementById('itemValue').value = item.value;
    document.getElementById('itemName').value = item.name;

    const actionBtn = document.querySelector('.new-item-details + div .button');
    actionBtn.innerText = "Save Changes";
    actionBtn.setAttribute('onclick', 'saveEdit()');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveEdit() {
    if (editIndex === null) return;

    users[currentUserIndex].budgets[currentBudgetIndex].expenses[editIndex] = {
        type: document.getElementById('itemType').value,
        date: document.getElementById('itemDate').value,
        value: parseFloat(document.getElementById('itemValue').value),
        name: document.getElementById('itemName').value
    };

    resetForm();
    dashboardUpdate();
}

function resetForm() {
    editIndex = null;

    document.getElementById('itemType').value = '';
    document.getElementById('itemDate').value = '';
    document.getElementById('itemValue').value = '';
    document.getElementById('itemName').value = '';

    const actionBtn = document.querySelector('.new-item-details + div .button');
    actionBtn.innerText = "Add expense";
    actionBtn.setAttribute('onclick', 'addExpense()');
}

function createBudget() {
    const nameInput = document.getElementById('goal_name');
    const descInput = document.getElementById('goal_desc'); // Note: In your DB this is bName
    const periodInput = document.getElementById('period');
    const amountInput = document.getElementById('goal_budget');

    if (!nameInput.value || !periodInput.value || !amountInput.value) {
        alert("Please fill in the Name, Period, and Budget amount.");
        return;
    }

    const newBudget = {
        bName: nameInput.value,
        description: descInput.value, // Extra info
        totalAmt: parseFloat(amountInput.value),
        period: periodInput.value,
        expenses: []
    };


    if (!users[currentUserIndex].budgets) {
        users[currentUserIndex].budgets = [];
    }

    users[currentUserIndex].budgets.push(newBudget);

    budgetList();
    


    alert(`Budget "${newBudget.bName}" created successfully!`);

    nameInput.value = '';
    descInput.value = '';
    periodInput.value = '';
    amountInput.value = '';
}

function budgetList() {
    const select = document.getElementById('category');
    if (!select) return;

    select.innerHTML = '<option value="">Select a Budget</option>';


    const userBudgets = users[currentUserIndex].budgets || [];

    userBudgets.forEach((budget, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = budget.bName;
        select.appendChild(option);
    });
}

if (document.getElementById('category')) {
    budgetList();
}

function deleteBudget() {
    const select = document.getElementById('category');
    if (!select.value) {
        alert("Please select a budget to delete.");
        return;
    }

    const indexToDelete = parseInt(select.value);
    const budgetName = users[currentUserIndex].budgets[indexToDelete].bName;

    if (confirm(`Are you sure you want to delete the budget "${budgetName}"? This action cannot be undone.`)) {
        users[currentUserIndex].budgets.splice(indexToDelete, 1);
        budgetList();

        alert(`Budget "${budgetName}" has been deleted.`);
    }
}