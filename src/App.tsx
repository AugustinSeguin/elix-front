import React, { useState } from 'react';
import './App.scss';
import Header from './components/header/Header';
import InputText from './components/input-text/InputText';
import Button from './components/button/Button';
import Footer from './components/footer/Footer';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="app">
      <Header title="EliX" />
      <main className="main-content">
        <form onSubmit={handleSubmit} className="form">
          <InputText
            value={formData.nom}
            onChange={handleChange('nom')}
            placeholder="Nom"
          />
          <InputText
            value={formData.prenom}
            onChange={handleChange('prenom')}
            placeholder="Prénom"
          />
          <InputText
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="Email"
          />
          <Button label="Soumettre" onClick={() =>
            console.log("submit")
          } />
        </form>
      </main>
      <Footer title="EliX" />
    </div>
  );
};

export default App;
