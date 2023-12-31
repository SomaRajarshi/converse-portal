import { BsReceiptCutoff } from 'react-icons/bs'
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import { RxCube } from 'react-icons/rx'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchaseLines } from '../../../features/MaterialIndent/MaterialSlice'
import ReactLoading from 'react-loading'

import {
  addToItemsList,
  addAllItems,
} from '../../../features/MaterialIndent/MaterialSlice'
import NewLinesComponent from './NewLinesComponent'
import axios from 'axios'

const dataOfAddItems = [
  {
    id: 1,
    itemDesc: 'Amaravthi Project',
    quantity: '200 tons',
    plannedDate: '22/04/2023',
  },
  {
    id: 2,
    itemDesc: 'Polavaram Project',
    quantity: '1000 tons',
    plannedDate: '3/09/2023',
  },
  {
    id: 3,
    itemDesc: 'Srisailam Project',
    quantity: '20 tons',
    plannedDate: '27/05/2023',
  },
  {
    id: 4,
    itemDesc: 'Nagarjuna Project',
    quantity: '2000 tons',
    plannedDate: '24/08/2024',
  },
]

const dataOfNewLines = [
  {
    id: 1,
    itemDesc: 'Amaravthi Project',
    quantity: '200 tons',
    plannedDate: '22/04/2023',
  },
  {
    id: 2,
    itemDesc: 'Polavaram Project',
    quantity: '1000 tons',
    plannedDate: '3/09/2023',
  },
  {
    id: 3,
    itemDesc: 'Srisailam Project',
    quantity: '20 tons',
    plannedDate: '27/05/2023',
  },
  {
    id: 4,
    itemDesc: 'Nagarjuna Project',
    quantity: '2000 tons',
    plannedDate: '24/08/2024',
  },
]

const ItemsComponent = ({ rfqId, setLoading }) => {
  const dispatch = useDispatch()
  const {
    rfqNewLines,
    rfqAddItems,
    isGetPurchaseLinesLoading,
    isGetPurchaseLinesError,
  } = useSelector((store) => store.material)
  const [showAddItems, setShowAddItems] = useState(true)
  const [showNewLines, setShowNewLines] = useState(true)

  const [addItems, setAdditems] = useState([])
  const [newLines, setNewLines] = useState([])

  const addItemsToAddItemsList = (newLine) => {
    dispatch(addToItemsList(newLine))
  }

  const addAllItemsToAddItemList = async () => {
    const reqbody = rfqNewLines.map((line) => line.id)

    try {
      setLoading(true)
      const resp = await axios.post(
        `http://13.232.221.196:9090/v1/purchase/material-indent/rfq/addLines/${rfqId}`,
        reqbody
      )
      console.log(resp.data)
      setLoading(false)
      dispatch(addAllItems())
    } catch (error) {
      setLoading(false)
      console.log(error)
      console.log('some error occued while adding items to add items list')
    }
  }

  if (isGetPurchaseLinesLoading) {
    return (
      <LoadingWrapper>
        <ReactLoading
          type="balls"
          color="var(--grey-500)"
          height={50}
          width={50}
        />
      </LoadingWrapper>
    )
  }

  if (isGetPurchaseLinesError) {
    return (
      <ErrorWrapper>
        <h4>Something went wrong while fetching data ...</h4>
      </ErrorWrapper>
    )
  }

  return (
    <Wrapper>
      <div className="payments-container">
        <div className="payments-header">
          <div className="left-wrapper">
            <span>
              <BsReceiptCutoff />
            </span>
            <h4>{rfqAddItems.length > 0 ? 'Added items' : 'No Added items'}</h4>
          </div>

          {rfqAddItems.length > 0 && (
            <div className="right-wrapper">
              {/* <button className="save-btn">Save</button> */}
              <button
                className="drop-down-btn"
                onClick={() => setShowAddItems(!showAddItems)}
              >
                {showAddItems ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
          )}
        </div>
        {/* <div className="payment-content">
          <div className="payment-left-wrapper">
            <span className="cube-icon">
              <RxCube />
            </span>
            <p>Acme Corp</p>
            <span className="numbers">15-500</span>
          </div>
          <div className="payment-right-wrapper">
            <span className="rupee-icon">
              <HiOutlineCurrencyRupee />
            </span>
            <p>&#8377;65,000</p>

            <div className="payment-btns-container">
              <button className="view-details-btn">View Details</button>
              <button className="approve-btn">Approve</button>
            </div>
          </div>
        </div> */}
      </div>

      {rfqAddItems.length > 0 && showAddItems && (
        <div className="table-container">
          <Table bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Item Description</th>
                <th>Quantity</th>
                <th>PlannedDate</th>
              </tr>
            </thead>
            <tbody>
              {rfqAddItems.map(
                ({ id, itemDesc, quantity, plannedDate }, index) => {
                  return (
                    <tr key={index}>
                      <td>{id}</td>
                      <td>{itemDesc}</td>
                      <td>{quantity}</td>
                      <td>{`${plannedDate[2]}/${plannedDate[1]}/${plannedDate[0]}`}</td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </Table>
        </div>
      )}

      <div className="payments-container">
        <div className="payments-header">
          <div className="left-wrapper">
            <span>
              <BsReceiptCutoff />
            </span>
            <h4>{rfqNewLines.length > 0 ? 'New Lines' : 'No New Lines'}</h4>
          </div>

          {rfqNewLines.length > 0 && (
            <div className="right-wrapper">
              <button
                className="add-all-items-btn"
                onClick={addAllItemsToAddItemList}
              >
                Add All items
              </button>

              <button
                className="drop-down-btn"
                onClick={() => setShowNewLines(!showNewLines)}
              >
                {showNewLines ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
          )}
        </div>
        {/* <div className="payment-content">
          <div className="payment-left-wrapper">
            <span className="cube-icon">
              <RxCube />
            </span>
            <p>Acme Corp</p>
            <span className="numbers">15-500</span>
          </div>
          <div className="payment-right-wrapper">
            <span className="rupee-icon">
              <HiOutlineCurrencyRupee />
            </span>
            <p>&#8377;65,000</p>

            <div className="payment-btns-container">
              <button className="view-details-btn">View Details</button>
              <button className="approve-btn">Approve</button>
            </div>
          </div>
        </div> */}
      </div>

      <NewLinesComponent showNewLines={showNewLines} rfqId={rfqId} />

      {/* {rfqNewLines.length > 0 &&
        showNewLines &&
        (isGetPurchaseLinesLoading ? (
          <h4>Still Loading ...</h4>
        ) : isGetPurchaseLinesError ? (
          <h4 style={{ color: 'var(--grey-400)' }}>
            Some error occured while fetching new lines
          </h4>
        ) : (
          <div className="table-container">
            <Table bordered>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Item Description</th>
                  <th>Quantity</th>
                  <th>PlannedDate</th>
                </tr>
              </thead>
              <tbody>
                {rfqNewLines.map((newline, index) => {
                  const { id, itemDesc, quantity, plannedDate } = newline
                  return (
                    <tr key={index}>
                      <td>{id}</td>
                      <td>{itemDesc}</td>
                      <td>{quantity}</td>
                      <td className="date-column">
                        <span>{`${plannedDate[2]}/${plannedDate[1]}/${plannedDate[0]}`}</span>
                        <button
                          className="add-items-btn"
                          onClick={() => addItemsToAddItemsList(newline)}
                        >
                          Add to items
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        ))} */}
    </Wrapper>
  )
}
export default ItemsComponent

const ErrorWrapper = styled.div`
  width: 100%%;
  height: 20rem;
  display: grid;
  place-items: center;
  background-color: var(--grey-50);
`

const LoadingWrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: grid;
  place-items: center;
  background-color: var(--grey-50);
`

const Wrapper = styled.div`
  padding: 2rem;
  position: relative;

  .payments-container {
    background-color: var(--white);
    margin-bottom: 1rem;
    border-radius: 10px;
  }

  .payments-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-wrapper {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
  }

  .left-wrapper span {
    display: grid;
    place-items: center;
    color: goldenrod;
  }

  .left-wrapper h4 {
    font-size: 1.3rem;
    margin-bottom: 0;
  }

  .payment-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  .payment-left-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .cube-icon {
    display: grid;
    place-items: center;
    color: var(--white);
    background-color: var(--grey-600);
    padding: 0.2rem;
    border-radius: 3px;
  }

  .numbers {
    background-color: var(--grey-50);
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    color: var(--grey-600);
    font-size: 0.7rem;
  }

  .payment-right-wrapper {
    display: flex;
    align-items: center;
  }

  .rupee-icon {
    font-weight: 500;
    font-size: 1.2rem;
    padding-right: 0.5rem;
  }

  .payment-right-wrapper p {
    padding-right: 1rem;
  }

  .payment-right-wrapper p,
  .payment-left-wrapper p {
    margin-bottom: 0;
  }

  .payment-btns-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .view-details-btn {
    padding: 0.5rem;
    font-size: 0.9rem;
    border-radius: 5px;
    background: transparent;
    border: 1px solid var(--grey-100);
    color: var(--grey-600);
    transition: var(--transition);
  }

  .view-details-btn:hover {
    transform: scale(1.05);
    background-color: var(--grey-50);
  }

  .approve-btn {
    background-color: #3fb580f5;
    color: var(--white);
    border: transparent;
    padding: 0.5rem;
    font-size: 0.9rem;
    border-radius: 5px;
    transition: var(--transition);
  }

  .approve-btn:hover {
    transform: scale(1.05);
    background-color: #329c6cf5;
  }

  .table-container {
    background-color: var(--white);
    border-radius: 10px;
    margin: 1rem 0;
  }

  th,
  td {
    color: var(--grey-700);
    padding: 0.5rem 1rem !important ;
  }

  .right-wrapper {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .drop-down-btn {
    margin-right: 2rem;
    background-color: transparent;
    border: none;
    font-size: 1.1rem;
    color: var(--grey-500);
    font-weight: 600;
    cursor: pointer;
  }

  .date-column {
    position: relative;
  }

  .add-items-btn {
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    font-size: 0.8rem;
    background-color: #22c77a;
    border: 1px solid var(--grey-100);
    border-radius: 5px;
    padding: 0.1rem 0.5rem;
    padding-bottom: 0.2rem;
    color: var(--white);
    transition: var(--transition);
  }

  .add-items-btn:hover {
    background-color: #25ae6e;
    transform: scale(1.05);
  }

  .save-btn,
  .add-all-items-btn {
    font-size: 0.9rem;
    background-color: var(--primary-400);
    border: 1px solid var(--grey-100);
    border-radius: 5px;
    padding: 0.1rem 0.5rem;
    color: var(--white);
    transition: var(--transition);
  }

  .save-btn:hover,
  .add-all-items-btn:hover {
    background-color: var(--primary-500);
    transform: scale(1.05);
  }
`
