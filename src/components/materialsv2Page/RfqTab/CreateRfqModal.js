import axios from 'axios'
import { useState } from 'react'
import { ImCross } from 'react-icons/im'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import ReactLoading from 'react-loading'
import { useEffect } from 'react'
import { debounce } from '@mui/material'

const initialState = {
  project: '',
  category: '',
  warehouse: '',
}

const initialSuggestionsState = {
  project: [],
  category: [],
  warehouse: [],
}

const url = 'http://13.232.221.196:9090/v1/purchase/rfq/create-rfq'

const CreateRfqModal = ({ showModal, setShowModal }) => {
  const [newRfqState, setNewRfqState] = useState(initialState)
  const [suggestions, setSuggestions] = useState(initialSuggestionsState)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleChange = async (e) => {
    const { name, value } = e.target
    setNewRfqState({
      ...newRfqState,
      [name]: value,
    })
    const suggestions = await fetchData(name, value)

    setSuggestions({
      ...suggestions,
      [name]: suggestions,
    })
  }

  const fetchData = async (name, value) => {
    try {
      let response = []

      switch (name) {
        case 'project':
          response = await axios(
            `http://13.232.221.196:9070/v1/masters/projects/searchProject/${value}`
          )
          break
        case 'category':
          response = await axios(
            `http://13.232.221.196:9070/v1/masters/item-group/searchItemGroup/${value}`
          )
          break
        case 'warehouse':
          response = await axios.post(
            `http://13.232.221.196:9070/v1/masters/warehouse/searchWarehouse/${value}`
          )
          break

        default:
          break
      }
      return response.data
    } catch (error) {
      console.log(error)
      console.log('some error occured while fetching sample json data')
    }
  }

  const handleSearchItemsClick = (name, value) => {
    setNewRfqState({
      ...newRfqState,
      [name]: value,
    })

    setSuggestions({
      ...suggestions,
      [name]: [],
    })
  }

  const discardRfq = () => {
    setNewRfqState(initialState)
    setShowModal(false)
  }

  const createRFQ = async () => {
    const { project, category, warehouse } = newRfqState

    if (!project || !category || !warehouse) {
      toast.error('Pls enter all the values')
      return
    }

    const reqBody = {
      category: category,
      project: project,
      warehouse: warehouse,
    }

    try {
      console.log(reqBody)
      setIsLoading(true)
      setIsError(false)
      await axios.post(url, reqBody)
      setIsLoading(false)
      setNewRfqState(initialState)
      setShowModal(false)
      toast.success('A New RFQ is created')
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      setNewRfqState(initialState)
      setShowModal(false)
      toast.error('An error while creating a new RFQ')
    }
  }

  useEffect(() => {}, [newRfqState])

  return (
    <Wrapper>
      <div className={`material-modal ${showModal ? 'show' : ''} `}>
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

          <h4 className="material-modal-header">New RFQ</h4>

          <div className="input-container">
            <div className="input-item ">
              <label htmlFor="project">Project </label>
              <input
                type="text"
                value={newRfqState.project}
                name="project"
                onChange={handleChange}
                id="project"
              />
              {suggestions?.project?.length > 0 && (
                <ul className="drop-down-container">
                  {suggestions?.project?.map((result, index) => {
                    return (
                      <li
                        key={index}
                        className="search-item"
                        onClick={() =>
                          handleSearchItemsClick('project', result.projectName)
                        }
                      >
                        {result.projectName}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div className="input-item ">
              <label htmlFor="category">Category </label>
              <input
                type="text"
                value={newRfqState.category}
                name="category"
                onChange={handleChange}
                id="category"
              />
              {suggestions?.category?.length > 0 && (
                <ul className="drop-down-container">
                  {suggestions?.category?.map((result, index) => {
                    return (
                      <li
                        key={index}
                        className="search-item"
                        onClick={() =>
                          handleSearchItemsClick(
                            'category',
                            result.itemGroupDesc
                          )
                        }
                      >
                        {result.itemGroupDesc}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div className="input-item">
              <label htmlFor="warehouse">Warehouse </label>
              <input
                type="text"
                value={newRfqState.warehouse}
                name="warehouse"
                onChange={handleChange}
                id="warehouse"
              />

              {suggestions?.warehouse?.length > 0 && (
                <ul className="drop-down-container">
                  {suggestions?.warehouse?.map((result, index) => {
                    return (
                      <li
                        key={index}
                        className="search-item"
                        onClick={() =>
                          handleSearchItemsClick('warehouse', result.whDesc)
                        }
                      >
                        {result.whDesc}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            <div className="btns-container">
              <button className="discard-btn" onClick={discardRfq}>
                Discard
              </button>
              <button className="create-btn" onClick={createRFQ}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default CreateRfqModal

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
    position: relative;
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

  .drop-down-container {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 0;
    background-color: rgba(255, 255, 255, 1);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    max-height: 15rem;
    overflow-y: scroll;
    position: absolute;
    top: 100%;
    z-index: 2;
    border: 1px solid var(--grey-200);
  }

  .search-item {
    padding: 0.1rem 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: var(--grey-500);
  }

  .search-item:hover {
    background-color: var(--primary-50);
  }
`
