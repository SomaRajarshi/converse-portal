import { FiFilter } from 'react-icons/fi'

import styled from 'styled-components'
import OrderComponent from './OrderComponent'
import { GrFormAdd } from 'react-icons/gr'

const InProgressComponent = () => {
  return (
    <Wrapper>
      <div className="filter-container">
        <div className="all-filter">
          <span className="filter-icon">
            <FiFilter />
          </span>

          <div className="filter-text">Add Filters</div>
        </div>

        <button className="create-order">
          <span className="create-order-icon">
            <GrFormAdd />
          </span>
          <span className="create-order-text">Create Order</span>
        </button>
      </div>

      <div className="orders-container">
        <OrderComponent />
        <OrderComponent />
        <OrderComponent />
        <OrderComponent />
      </div>
    </Wrapper>
  )
}
export default InProgressComponent

const Wrapper = styled.div`
  padding: 2rem;
  overflow: scroll;

  .filter-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .all-filter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--grey-300);
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    color: var(--grey-900);
    cursor: pointer;
    transition: var(--transition);
  }

  .all-filter:hover {
    transform: scale(1.05);
  }

  .orders-container {
  }
`
