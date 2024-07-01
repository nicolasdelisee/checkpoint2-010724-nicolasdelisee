import "reflect-metadata";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import Country, { AddCountryInput } from "./entities";
import CountryService from "./services";

@Resolver()
export default class CountryResolver {
  @Query(() => [Country])
  async listCountries() {
    const countries: Country[] = await new CountryService().listCountries();
    return countries;
  }

  @Query(() => Country)
  async findCountryByCode(@Arg("code") code: string) {
    const country = await new CountryService().findCountryByCode(code);
    return country;
  }

  @Query(() => [Country])
  async findCountriesByContinentCode(@Arg("continentCode") continentCode: string) {
    const countries = await new CountryService().findCountriesByContinentCode(continentCode);
    return countries;
  }

  @Mutation(() => Country)
  async addCountry(@Arg("infos") infos: AddCountryInput){
    const countryCreated = await new CountryService().addCountry(infos);
    return countryCreated;
  }

  @Mutation(() => [Country])
  async deleteCountry(@Arg("id") id: string) {
    const countryDeleted = await new CountryService().deleteCountry(id);
    return countryDeleted;
  }
}