import axios from "axios";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import styled from "styled-components";
import ReactLoading from "react-loading";

const initialState = {
  project: "",
  category: "",
  warehouse: "",
  businessPartner: "",
};

const url = "http://13.232.221.196:9090/v1/purchase/rfq/create-rfq";

const CreateOrderModal = ({ showModal, setShowModal }) => {
  const [newOrderState, setNewOrderState] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setNewOrderState({
      ...newOrderState,
      [e.target.name]: e.target.value,
    });
  };

  const discardOrder = () => {
    setNewOrderState(initialState);
    setShowModal(false);
  };

  const createOrder = async () => {
    const { project, category, warehouse, businessPartner } = newOrderState;

    if (!project || !category || !warehouse || !businessPartner) {
      toast.error("Pls enter all the values");
      return;
    }

    const reqBody = {
      category: category,
      project: project,
      warehouse: warehouse,
      businessPartner: businessPartner,
    };

    try {
      console.log(reqBody);
      setIsLoading(true);
      setIsError(false);
      await axios.post(url, reqBody);
      setIsLoading(false);
      setNewOrderState(initialState);
      setShowModal(false);
      toast.success("A New Order is created");
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setNewOrderState(initialState);
      setShowModal(false);
      toast.error("An error while creating a new order");
    }
  };

  return (
    <Wrapper>
      <div className={`material-modal ${showModal ? "show" : ""} `}>
        <div className="material-modal-content">
          {isLoading && (
            <div className="create-rfq-loading">
              <ReactLoading
                type="balls"
                color="var(--grey-500)"
                height={50}
                width={50}
              />
            </div>
          )}

          <h4 className="material-modal-header">New Purchase Order</h4>

          <div className="input-container">
            <div className="input-item ">
              <label htmlFor="project">Project</label>
              <input
                type="text"
                value={newOrderState.project}
                name="project"
                onChange={handleChange}
                id="project"
              />
            </div>
            <div className="input-item ">
              <label htmlFor="category">Category </label>
              <input
                type="text"
                value={newOrderState.category}
                name="category"
                onChange={handleChange}
                id="category"
              />
            </div>

            <div className="input-item">
              <label htmlFor="warehouse">Warehouse</label>
              <input
                type="text"
                value={newOrderState.warehouse}
                name="warehouse"
                onChange={handleChange}
                id="warehouse"
              />
            </div>

            <div className="input-item">
              <label htmlFor="businessPartner">Business Partner</label>
              <input
                type="text"
                value={newOrderState.businessPartner}
                name="businessPartner"
                onChange={handleChange}
                id="businessPartner"
              />
            </div>

            <div className="btns-container">
              <button className="discard-btn" onClick={discardOrder}>
                Discard
              </button>
              <button className="create-btn" onClick={createOrder}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default CreateOrderModal;

const Wrapper = styled.div`
  position: absolute;
  .material-modal {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    place-items: center;
    z-index: 30;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  }

  .material-modal.show {
    opacity: 1;
    pointer-events: visible;
  }

  .material-modal-content {
    background-color: var(--white);
    padding: 2rem 3rem;
    border-radius: 10px;
    color: var(--grey-700);
    width: 25%;
    max-width: 30rem;
    position: relative;
  }

  .material-modal-header {
    display: inline-block;
    border-bottom: 1px solid var(--grey-100);
    color: var(--grey-600);
    text-align: left;
    padding: 0.5rem 0;
  }

  .close-modal-btn {
    background-color: transparent;
    border: none;
    position: absolute;
    top: 2rem;
    right: 2rem;
    color: #f8a9b0;
    font-size: 1.5rem;
    transition: all 0.2s ease-in-out;
  }

  .close-modal-btn:hover {
    color: #b52c37;
  }

  .create-rfq-loading {
    color: var(--white);
    position: absolute;
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 32;
    top: 0;
    left: 0;
    border-radius: 10px;
  }

  .input-container {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
    position: relative;
  }

  .input-item {
    /* max-width: 400px; */
  }

  .input-item label {
    display: block;
    color: var(--grey-800);
    font-weight: 500;
    font-size: 0.8rem;
  }

  .input-item input {
    display: block;
    width: 100%;
    border: 1px solid var(--grey-100);
    border-radius: 5px;
    margin-top: 0.2rem;
    padding: 0.25rem 0.7rem;
    font-size: 0.8rem;
    color: var(--grey-900);
    transition: var(--transition);
  }

  .input-item input:focus {
    border: 1px solid var(--grey-300);
  }

  .planned-date-container label {
    display: block;
    color: var(--grey-800);
    font-weight: 500;
    font-size: 0.8rem;
  }

  .planned-date-container input {
    display: block;
    width: 100%;

    border-radius: 5px;
    margin-top: 0.2rem;
    padding: 0.25rem 0.7rem;
    font-size: 0.8rem;
    color: var(--grey-900);
    transition: var(--transition);
  }

  .btns-container {
    display: flex;
    justify-content: right;
    margin: 2rem 0;
    gap: 1rem;
  }

  .create-btn,
  .discard-btn {
    background-color: transparent;
    border: 1px solid var(--grey-200);
    border-radius: 5px;
    padding: 0.25rem 1rem;
    letter-spacing: 0.1rem;
    transition: var(--transition);
  }

  .create-btn {
    background-color: var(--primary-400);
    color: var(--white);
  }

  .create-btn:hover {
    background-color: var(--primary-500);
    transform: scale(1.05);
  }

  .discard-btn:hover {
    background-color: var(--red-light);
    color: var(--red-dark);
    transform: scale(1.05);
    border: 1px solid var(--grey-100);
  }
`;