// Function to toggle between login and sign up forms
function toggleForms() {
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
  
    // Toggle visibility of login and sign up forms
    if (loginForm.style.display === 'block') {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    } else {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    }
  }
  
  // Event listener for sign up link
  document.getElementById('signup-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    toggleForms();
  });
  
  // Event listener for login link
  document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    toggleForms();
  });
  
  // Mock login functionality
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
  
    // Check if username and password are correct (mocked for demo)
    if (username === 'admin' && password === 'password') {
      // Hide login interface
      document.getElementById('login-container').style.display = 'none';
      // Show homepage
      document.getElementById('homepage').style.display = 'block';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  });
  
  // Mock sign up functionality
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    var firstName = document.getElementById('signup-first-name').value;
    var lastName = document.getElementById('signup-last-name').value;
    var username = document.getElementById('signup-username').value;
    var password = document.getElementById('signup-password').value;
    var email = document.getElementById('signup-email').value;
  
    // Mock sign up process (console log for demo)
    console.log('Sign Up Successful!');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Email:', email);
  });

  
  document.getElementById('generate-plan').addEventListener('click', function() {
    const age = document.getElementById('age').value;
    const preferences = document.getElementById('preferences').value;
  
    // Sample meal plan (replace with actual meal plan generation logic)
    const mealPlan = generateMealPlan(age, preferences);
    displayMealPlan(mealPlan);
  });
  
  function generateMealPlan(age, preferences) {
    // Sample meal plan generation logic (replace with actual logic)
    const breakfast = "Cereal with milk";
    const lunch = "Grilled curry with vegetables";
    const dinner = "Pasta with tomato sauce";
  
    return {
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner
    };
  }
  
  function displayMealPlan(mealPlan) {
    const mealPlanDiv = document.getElementById('meal-plan');
    mealPlanDiv.innerHTML = `
      <h2>Meal Plan</h2>
      <p><strong>Breakfast:</strong> ${mealPlan.breakfast}</p>
      <p><strong>Lunch:</strong> ${mealPlan.lunch}</p>
      <p><strong>Dinner:</strong> ${mealPlan.dinner}</p>
    `;
  }


  //bmi calculator
  document.getElementById('calculate-bmi').addEventListener('click', function() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
  
    const bmi = calculateBMI(weight, height);
    const category = getBMICategory(bmi);
  
    displayBMIResult(bmi, category);
  });
  
  function calculateBMI(weight, height) {
    return weight / ((height / 100) * (height / 100));
  }
  
  function getBMICategory(bmi) {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
  
  function displayBMIResult(bmi, category) {
    const bmiResultDiv = document.getElementById('bmi-result');
    bmiResultDiv.innerHTML = `
      <h2>BMI Result</h2>
      <p><strong>BMI:</strong> ${bmi.toFixed(2)}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Suggestions:</strong> ${getSuggestions(category)}</p>
    `;
  }
  
  function getSuggestions(category) {
    switch (category) {
      case 'Underweight':
        return 'Encourage balanced diet with healthy fats and proteins. Consult a healthcare professional if concerns persist.';
      case 'Normal weight':
        return 'Continue promoting healthy eating habits and regular physical activity.';
      case 'Overweight':
        return 'Focus on portion control and increasing physical activity. Consult a healthcare professional for personalized advice.';
      case 'Obese':
        return 'Seek guidance from a healthcare professional for comprehensive weight management strategies.';
      default:
        return '';
    }
  }

  document.getElementById('logout-btn').addEventListener('click', function() {
    // Show login interface
    document.getElementById('login-container').style.display = 'block';
    // Hide homepage
    document.getElementById('homepage').style.display = 'none';
  })

  /*signup database*/
  document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(this); // Get form data
    const userData = {
      First_Name: formData.get('First_Name'),
      Last_Name: formData.get('Last_Name'),
      Username: formData.get('Username'),
      Email: formData.get('Email'),
      Password: formData.get('Password')
    };
  
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  