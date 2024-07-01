const fs = require('fs');
const yaml = require('js-yaml');
import CountryService from "../services";

// Define an interface for the country data
interface Country {
    code: string;
    continentCode: string;
    name: string;
    emoji: string;
}

// Define an interface for the fixture data
interface FixtureData {
    entity: string;
    items: Record<string, Country>;
}

async function loadFixtures() {
    // Load YAML file and parse it
    const file = fs.readFileSync('./src/fixtures/Country.yml', 'utf8');
    const fixtures = yaml.load(file) as FixtureData;

    // Get the CountryService instance
    const countryService = new CountryService();

    // Iterate over each country in the fixtures
    for (const countryKey in fixtures.items) {
        const country = fixtures.items[countryKey];
        // Create the country using the CountryService
        await countryService.addCountry(country);
    }

    console.log('Fixtures loaded successfully');
}

loadFixtures().catch(console.error);