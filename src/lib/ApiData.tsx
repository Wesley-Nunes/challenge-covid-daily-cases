import IData from '../interfaces/IData'

class ApiData {
  private countries: string[]
  private data: Array<IData>
  private cleanData: Array<IData> = [
    {
      location: '',
      date: '',
      variant: '',
      num_sequences: 0,
      perc_sequences: 0,
      num_sequences_total: 0
    }
  ]

  constructor(data: Array<IData>) {
    this.data = data
  }

  extractCountries(): void {
    const set: Set<string> = new Set()
    this.data.forEach(element => set.add(element['location']))
    this.countries = Array.from(set)
  }

  clean(country: string): void {
    const dataOfCountry = this.data.filter(data => data['location'] === country)
    const variantGroup = dataOfCountry.map(
      data => `<br>${data.variant}: ${data.num_sequences}`
    )
    dataOfCountry.forEach(data => (data.hover = variantGroup))
    this.cleanData = this.cleanData.concat(dataOfCountry)
  }

  get getCountries(): string[] {
    return this.countries
  }
  get getCleanData(): Array<IData> {
    return this.cleanData
  }
}

export default ApiData
