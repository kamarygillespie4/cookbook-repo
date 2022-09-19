const newFormHandler = async function(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value;
    const ingredients = document.querySelector('textarea[name="recipe-ingredients"]').value;
    const instructions = document.querySelector('textarea[name="recipe-instructions"]').value;

    await fetch(`/api/recipe`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            ingredients,
            instructions
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#new-recipe-form')
    .addEventListener('submit', newFormHandler);