const form = document.getElementById('taxCalculatorForm');
const grossAnnualIncomeInput = document.getElementById('grossAnnualIncome');
const extraIncomeInput = document.getElementById('extraIncome');
const ageGroupSelect = document.getElementById('ageGroup');
const deductionsInput = document.getElementById('deductions');
const submitBtn = document.getElementById('submitBtn');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementsByClassName('close')[0];
const resultText = document.getElementById('result');

const errorIcons = document.querySelectorAll('.error-icon');

errorIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        const tooltip = icon.getAttribute('data-tooltip');
        icon.setAttribute('title', tooltip);
    });

    icon.addEventListener('mouseout', () => {
        icon.removeAttribute('title');
    });
});

function calculateTax(income, age) {
    const taxFreeIncome = 800000;
    let taxableIncome = income - taxFreeIncome;
    let tax = 0;

    if (taxableIncome > 0) {
        if (age < 40) {
            tax = taxableIncome * 0.3;
        } else if (age >= 40 && age < 60) {
            tax = taxableIncome * 0.4;
        } else {
            tax = taxableIncome * 0.1;
        }
    }

    return tax;
}

function validateForm() {
    let isValid = true;
    const grossAnnualIncomeValue = parseFloat(grossAnnualIncomeInput.value);
    const extraIncomeValue = parseFloat(extraIncomeInput.value);
    const ageGroupValue = ageGroupSelect.value;
    const deductionsValue = parseFloat(deductionsInput.value);

    if (isNaN(grossAnnualIncomeValue)) {
        grossAnnualIncomeInput.nextElementSibling.style.display = 'inline';
        isValid = false;
    } else {
        grossAnnualIncomeInput.nextElementSibling.style.display = 'none';
    }

    if (isNaN(extraIncomeValue)) {
        extraIncomeInput.nextElementSibling.style.display = 'inline';
        isValid = false;
    } else {
        extraIncomeInput.nextElementSibling.style.display = 'none';
    }

    if (ageGroupValue === '') {
        ageGroupSelect.nextElementSibling.style.display = 'inline';
        isValid = false;
    } else {
        ageGroupSelect.nextElementSibling.style.display = 'none';
    }

    if (isNaN(deductionsValue)) {
        deductionsInput.nextElementSibling.style.display = 'inline';
        isValid = false;
    } else {
        deductionsInput.nextElementSibling.style.display = 'none';
    }

    return isValid;
}

function calculateOverallIncome() {
    const grossAnnualIncomeValue = parseFloat(grossAnnualIncomeInput.value);
    const extraIncomeValue = parseFloat(extraIncomeInput.value);
    const deductionsValue = parseFloat(deductionsInput.value);

    const overallIncome = grossAnnualIncomeValue + extraIncomeValue - deductionsValue;
    return overallIncome;
}

function getAgeGroup(ageGroupValue) {
    switch (ageGroupValue) {
        case 'lt40':
            return 'Age < 40';
        case 'gte40lt60':
            return 'Age ≥ 40 & < 60';
        case 'gte60':
            return 'Age ≥ 60';
        default:
            return '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        const overallIncome = calculateOverallIncome();
        const ageGroupValue = ageGroupSelect.value;
        const ageGroup = getAgeGroup(ageGroupValue);
        const tax = calculateTax(overallIncome, parseFloat(ageGroupValue.replace(/\D/g, '')));

        resultText.textContent = `Your overall income will be ${overallIncome.toFixed(2)}. ${ageGroup}. Tax: ${tax.toFixed(2)}`;
        modal.style.display = 'block';
    }
});

modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        const overallIncome = calculateOverallIncome();
        const ageGroupValue = ageGroupSelect.value;
        const ageGroup = getAgeGroup(ageGroupValue);
        const tax = calculateTax(overallIncome, parseFloat(ageGroupValue.replace(/\D/g, '')));

        const alertMessage = `Gross Annual Income: ${grossAnnualIncomeInput.value}\nExtra Income: ${extraIncomeInput.value}\nAge Group: ${ageGroup}\nDeductions: ${deductionsInput.value}\nOverall Income: ${overallIncome.toFixed(2)}\nTax: ${tax.toFixed(2)}`;

        alert(alertMessage);

        resultText.textContent = `Your overall income will be ${overallIncome.toFixed(2)}. ${ageGroup}. Tax: ${tax.toFixed(2)}`;
        modal.style.display = 'block';
    }
});
