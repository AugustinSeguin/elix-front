import { useState } from "react";
import Header from "../components/header/Header";
import InputText from "../components/input-text/InputText";
import Button from "../components/button/Button";
import Footer from "../components/footer/Footer";
import Checkbox from "../components/checkbox/Checkbox";
import InputNumber from "../components/input-number/InputNumber";
import SelectList from "../components/select-list/SelectList";
import Icon from "../components/icon/Icon";
import Image from "../components/media/Image";
import Video from "../components/media/Video";
import { FaHeart, FaUser, FaStar } from "react-icons/fa";

const Home = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    age: 16,
    theme: "",
    acceptTerms: false,
  });

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  };

  const themeOptions = [
    { value: "1", label: "Contraception" },
    { value: "2", label: "Consentement" },
    { value: "3", label: "Relations saines" },
    { value: "4", label: "Anatomie" },
    { value: "5", label: "Prévention MST/IST" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="EliX - Démo des composants" sticky={true}></Header>

      <main className="flex-1 container-app py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Formulaire */}
          <div className="card">
            <h2 className="text-2xl font-bold color-text mb-6">
              📝 Formulaire d'inscription
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputText
                label="Nom"
                value={formData.nom}
                onChange={handleChange("nom")}
                placeholder="Entrez votre nom"
                fullWidth
              />

              <InputText
                label="Prénom"
                value={formData.prenom}
                onChange={handleChange("prenom")}
                placeholder="Entrez votre prénom"
                fullWidth
              />

              <InputText
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="Entrez votre email"
                fullWidth
              />

              <InputNumber
                label="Âge"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: Number(e.target.value) })
                }
                min={10}
                max={25}
                step={1}
                fullWidth
                helperText="Entre 10 et 25 ans"
              />

              <SelectList
                label="Thème qui vous intéresse"
                options={themeOptions}
                value={formData.theme}
                onChange={(value) =>
                  setFormData({ ...formData, theme: value as string })
                }
                searchable
                fullWidth
                placeholder="Choisissez un thème"
              />

              <Checkbox
                label="J'accepte les conditions d'utilisation"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData({ ...formData, acceptTerms: e.target.checked })
                }
                checkboxSize="md"
              />

              <div className="flex gap-3 mt-4">
                <Button label="Soumettre" type="submit" variant="primary" />
                <Button
                  label="Annuler"
                  type="button"
                  variant="outline"
                  onClick={() => console.log("Annulé")}
                />
                <Button
                  label="Supprimer"
                  type="button"
                  variant="danger"
                  onClick={() => console.log("Supprimé")}
                />
              </div>
            </form>
          </div>

          {/* Section Boutons */}
          <div className="card">
            <h2 className="text-2xl font-bold color-text mb-6">
              🎨 Variantes de boutons
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button label="Primary" variant="primary" size="sm" />
                <Button label="Secondary" variant="secondary" size="sm" />
                <Button label="Outline" variant="outline" size="sm" />
                <Button label="Ghost" variant="ghost" size="sm" />
                <Button label="Danger" variant="danger" size="sm" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button label="Small" variant="primary" size="sm" />
                <Button label="Medium" variant="primary" size="md" />
                <Button label="Large" variant="primary" size="lg" />
              </div>
              <Button label="Full Width" variant="primary" fullWidth />
            </div>
          </div>

          {/* Section Icônes */}
          <div className="card">
            <h2 className="text-2xl font-bold color-text mb-6">⭐ Icônes</h2>
            <div className="flex items-center gap-6">
              <Icon icon={FaHeart} size="sm" color="red" />
              <Icon icon={FaUser} size="md" color="blue" />
              <Icon icon={FaStar} size="lg" color="gold" />
              <Icon icon={FaHeart} size="xl" className="text-primary-500" />
            </div>
          </div>

          {/* Section Image */}
          <div className="card">
            <h2 className="text-2xl font-bold color-text mb-6">
              🖼️ Composant Image
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Image
                src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=400"
                alt="Exemple d'image éducative"
                aspectRatio="16/9"
                rounded="lg"
                objectFit="cover"
                showCaption
                caption="Image avec légende"
              />
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400"
                alt="Santé et bien-être"
                aspectRatio="1/1"
                rounded="full"
                objectFit="cover"
                zoomOnHover
              />
            </div>
          </div>

          {/* Section Vidéo */}
          <div className="card">
            <h2 className="text-2xl font-bold color-text mb-6">
              🎥 Composant Vidéo
            </h2>
            <Video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              aspectRatio="16/9"
              rounded="lg"
              showCustomControls
              poster="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=800"
            />
          </div>

          {/* Section Inputs avancés */}
          <div className="card">
            <h2 className="text-2xl font-bold color-text mb-6">
              🔧 Autres composants
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Checkbox</h3>
                <div className="space-y-2">
                  <Checkbox label="Option 1" checkboxSize="sm" />
                  <Checkbox label="Option 2" checkboxSize="md" defaultChecked />
                  <Checkbox label="Option 3" checkboxSize="lg" />
                  <Checkbox label="Avec erreur" error="Ce champ est requis" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Input Number</h3>
                <div className="space-y-2">
                  <InputNumber
                    defaultValue={10}
                    min={0}
                    max={100}
                    step={5}
                    inputSize="sm"
                  />
                  <InputNumber
                    defaultValue={50}
                    min={0}
                    max={100}
                    showControls={false}
                    fullWidth
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Select List</h3>
                <SelectList
                  options={themeOptions}
                  placeholder="Mode single select"
                  fullWidth
                />
                <div className="mt-3">
                  <SelectList
                    options={themeOptions}
                    placeholder="Mode multi-select"
                    multiple
                    searchable
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer title="EliX" />
    </div>
  );
};

export default Home;
