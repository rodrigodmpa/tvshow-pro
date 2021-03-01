import React, { FormEvent, useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import cookies from 'nookies'
// import { Container } from './styles';
const countries = [
  {
    label: 'us',
    name: 'United Stated'
  },
  {
    label: 'br',
    name: 'Brazil'
  },
]

const Header= () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(router.query.country)


  function handleChange(e: FormEvent) {
    const target = e.target as HTMLInputElement;
    setSelectedCountry(target.value);
    router.push(`/${target.value}`)
  }

  function renderCountries() {
    return (
        countries.map((country) => {
         return (
            <option key={country.label} value={country.label}>
              {country.name}
            </option>
        )})
    )
  }

  useEffect(() => {
    cookies.set(null, 'defaultCountry', String(selectedCountry),{
      maxAge: 10 * 24 * 60 * 60,
      path: '/'
    })
  }, [selectedCountry])


  return (
    <div className="header">
      
      <select onChange={handleChange} value={selectedCountry}>
        {renderCountries()}
      </select>

      <style jsx>{`
      .header {
        padding: 20px;
        background-color: #333;
        color: white;
        text-align: center;
        margin-bottom: 10px;
      }
    `}</style>
    </div>
  );

}

export default Header;