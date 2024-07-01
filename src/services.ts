import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Country from "./entities";

export default class CountryService {
  db: Repository<Country>;
  constructor() {
    this.db = datasource.getRepository(Country);
  }

  async listCountries() {
    return this.db.find();
  }

  async findCountryByCode(code: string) {
    const country = await this.db.findOneBy({ code });
    if (!country) {
      throw new Error("Ce pays n'existe pas, essaie un autre code Pays");
    }
    return country;
  }

  async findCountriesByContinentCode(continentCode: string) {
    const countries = await this.db.findBy({ continentCode });
    if (!countries || countries.length === 0) {
      throw new Error("Ce code continent n'existe pas, essaie un autre code");
    }
    return countries;
  }

  async addCountry({ code, continentCode, name, emoji }: Omit<Country, "id">) {
    const country = this.db.create({ code, continentCode, name, emoji });
    return await this.db.save(country);
  }

  async deleteCountry(id: string) {
    const country = await this.db.findOneBy({ id });
    if (!country) {
      throw new Error("Ce pays n'existe pas");
    }
    await this.db.delete(country);
    return this.listCountries();
  }
}
