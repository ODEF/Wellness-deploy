"use client";

import { useState } from "react";
import { type ClientPet } from "../../lib/clients/pets";
import styles from "./ClientDashboardShell.module.css";

type ClientPetsManagerProps = {
  initialPets: ClientPet[];
};

type PetForm = {
  name: string;
  breed: string;
  age: string;
  weight: string;
  notes: string;
};

const emptyPetForm: PetForm = {
  name: "",
  breed: "",
  age: "",
  weight: "",
  notes: "",
};

export default function ClientPetsManager({
  initialPets,
}: ClientPetsManagerProps) {
  const [pets, setPets] = useState<ClientPet[]>(initialPets);
  const [deletedPets, setDeletedPets] = useState<ClientPet[]>([]);
  const [showDeletedPets, setShowDeletedPets] = useState(false);

  const [form, setForm] = useState<PetForm>(emptyPetForm);
  const [status, setStatus] = useState<"Idle" | "Saving" | "Saved" | "Error">(
    "Idle",
  );

  function updateForm(field: keyof PetForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status === "Saved") {
      setStatus("Idle");
    }
  }

  async function loadDeletedPets() {
    try {
      setStatus("Saving");

      const response = await fetch("/api/client/pets?status=deleted");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to load deleted pets");
      }

      setDeletedPets(result.pets ?? []);
      setShowDeletedPets(true);
      setStatus("Idle");
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
  }

  async function handleSavePet() {
    if (!form.name.trim()) {
      setStatus("Error");
      return;
    }

    try {
      setStatus("Saving");

      const response = await fetch("/api/client/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to save pet");
      }

      setPets((current) => [...current, result.pet]);
      setForm(emptyPetForm);
      setStatus("Saved");
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
  }

  async function handleDeletePet(id: string) {
    const confirmed = window.confirm("Delete this pet?");

    if (!confirmed) {
      return;
    }

    try {
      setStatus("Saving");

      const response = await fetch(`/api/client/pets/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to delete pet");
      }

      setPets((current) => current.filter((pet) => pet.id !== id));
      setDeletedPets((current) => [...current, result.pet]);
      setStatus("Saved");
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
  }

  async function handleRestorePet(id: string) {
    try {
      setStatus("Saving");

      const response = await fetch(`/api/client/pets/${id}`, {
        method: "PATCH",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Failed to restore pet");
      }

      setDeletedPets((current) => current.filter((pet) => pet.id !== id));
      setPets((current) => [...current, result.pet]);
      setStatus("Saved");
    } catch (error) {
      console.error(error);
      setStatus("Error");
    }
  }

  return (
    <section className={styles.settingsGrid}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>Saved pets</p>
            <h2>My Pets</h2>
          </div>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={loadDeletedPets}
            disabled={status === "Saving"}
          >
            View Deleted
          </button>
        </div>

        {pets.length === 0 ? (
          <div className={styles.emptyBox}>
            <h2>No pets yet</h2>
            <p>Add your first pet using the form.</p>
          </div>
        ) : (
          <div className={styles.petList}>
            {pets.map((pet) => (
              <article className={styles.petCard} key={pet.id}>
                <div className={styles.petAvatar}>
                  {pet.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{pet.name}</h3>
                  <p>{pet.breed || "Breed not added"}</p>

                  <div className={styles.petMeta}>
                    <span>{pet.age || "Age not added"}</span>
                    <span>{pet.weight || "Weight not added"}</span>
                  </div>

                  {pet.notes && <p>{pet.notes}</p>}

                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeletePet(pet.id)}
                    disabled={status === "Saving"}
                  >
                    Delete Pet
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {showDeletedPets && (
          <div className={styles.deletedPetsBox}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.eyebrow}>Deleted pets</p>
                <h2>Restore Pets</h2>
              </div>

              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setShowDeletedPets(false)}
              >
                Hide
              </button>
            </div>

            {deletedPets.length === 0 ? (
              <div className={styles.emptyBox}>
                <h2>No deleted pets</h2>
                <p>Deleted pets will appear here.</p>
              </div>
            ) : (
              <div className={styles.petList}>
                {deletedPets.map((pet) => (
                  <article className={styles.petCard} key={pet.id}>
                    <div className={styles.petAvatar}>
                      {pet.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3>{pet.name}</h3>
                      <p>{pet.breed || "Breed not added"}</p>

                      <div className={styles.petMeta}>
                        <span>{pet.age || "Age not added"}</span>
                        <span>{pet.weight || "Weight not added"}</span>
                      </div>

                      <button
                        type="button"
                        className={styles.restoreButton}
                        onClick={() => handleRestorePet(pet.id)}
                        disabled={status === "Saving"}
                      >
                        Restore Pet
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.eyebrow}>New pet</p>
            <h2>Add Pet</h2>
          </div>
        </div>

        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>Name</span>
            <input
              value={form.name}
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Coco"
            />
          </label>

          <label className={styles.field}>
            <span>Breed</span>
            <input
              value={form.breed}
              onChange={(event) => updateForm("breed", event.target.value)}
              placeholder="Toy Poodle"
            />
          </label>

          <label className={styles.field}>
            <span>Age</span>
            <input
              value={form.age}
              onChange={(event) => updateForm("age", event.target.value)}
              placeholder="4 years"
            />
          </label>

          <label className={styles.field}>
            <span>Weight</span>
            <input
              value={form.weight}
              onChange={(event) => updateForm("weight", event.target.value)}
              placeholder="6.5 kg"
            />
          </label>

          <label className={styles.field}>
            <span>Notes</span>
            <input
              value={form.notes}
              onChange={(event) => updateForm("notes", event.target.value)}
              placeholder="Sensitive skin, allergies..."
            />
          </label>
        </div>

        <div className={styles.saveRow}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleSavePet}
            disabled={status === "Saving"}
          >
            {status === "Saving" ? "Saving..." : "Save Pet"}
          </button>

          {status === "Saved" && (
            <span className={styles.successText}>Changes saved</span>
          )}

          {status === "Error" && (
            <span className={styles.errorText}>Action failed</span>
          )}
        </div>
      </div>
    </section>
  );
}