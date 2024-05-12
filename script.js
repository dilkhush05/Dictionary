
const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetching Data...";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const wordData = data[0];
            const meanings = wordData.meanings[0];
            const definitions = meanings.definitions[0];
            const synonyms = meanings.synonyms || [];
            const antonyms = meanings.antonyms || [];

            resultDiv.innerHTML = `
                <h1><strong>Word:</strong> ${wordData.word}</h1>
                <p class="partsofspeech">${meanings.partOfSpeech}</p>
                <p><strong>Meaning:</strong> ${definitions ? definitions.definition : "Not found"}</p>
                <p><strong>Example:</strong> ${definitions ? definitions.example : "Not found"}</p>
                <p><strong>Synonyms:</strong> ${synonyms.length > 0 ? synonyms.join(', ') : "Not found"}</p>
                <p><strong>Antonyms:</strong> ${antonyms.length > 0 ? antonyms.join(', ') : "Not found"}</p>
                <div><a href="${wordData.sourceUrls}" target="_blank">Read More</a></div>
            `;
        } else {
            resultDiv.innerHTML = `<p>Sorry, the word could not be found.</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>Sorry, an error occurred while fetching data.</p>`;
    }
};
