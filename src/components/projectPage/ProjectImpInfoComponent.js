import styled from 'styled-components'
import RoofingIcon from '@mui/icons-material/Roofing'
import ConstructionIcon from '@mui/icons-material/Construction'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import NumbersIcon from '@mui/icons-material/Numbers'
import { Tooltip } from '@mui/material'
import { useLocation } from 'react-router-dom'

const ProjectImpInfoComponent = ({
  id,
  projectId,
  projectDesc,
  warehouseId,
  warehouseDesc,
  categoryId,
  categoryDesc,
  createdDate,
  plannedDate,
  status,
  category,
  projectCode,
  warehouseCode,
}) => {
  return (
    <Wrapper>
      <div className="left-wrapper">
        <div className="left-header">{projectCode}</div>
        <div className="left-content">
          <Tooltip
            title="RFQ Id"
            placement="bottom-start"
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'f0f4f8',
                  letterSpacing: '0.1rem',
                  padding: `0.5 1`,
                  backgroundColor: '#334e68',
                  position: 'relative',
                  margin: '0',
                  bottom: '0.75rem',
                },
              },
            }}
          >
            <div className="project-value">
              <span>
                <NumbersIcon />
              </span>
              <p>{`${id}`}</p>
            </div>
          </Tooltip>

          <Tooltip
            title="Project"
            placement="bottom-start"
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'f0f4f8',
                  letterSpacing: '0.1rem',
                  padding: `0.5 1`,
                  backgroundColor: '#334e68',
                  position: 'relative',
                  margin: '0',
                  bottom: '0.75rem',
                },
              },
            }}
          >
            <div className="location">
              <span>
                <RoofingIcon />
              </span>
              <p>{projectDesc}</p>
            </div>
          </Tooltip>

          <Tooltip
            title="Warehouse"
            placement="bottom-start"
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'f0f4f8',
                  letterSpacing: '0.1rem',
                  padding: `0.5 1`,
                  backgroundColor: '#334e68',
                  position: 'relative',
                  margin: '0',
                  bottom: '0.75rem',
                },
              },
            }}
          >
            <div className="project-value">
              <span>
              <WarehouseIcon />
                
              </span>
              <p>{warehouseDesc}</p>
            </div>
          </Tooltip>

          <Tooltip
            title="Category"
            placement="bottom-start"
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'f0f4f8',
                  letterSpacing: '0.1rem',
                  padding: `0.5 1`,
                  backgroundColor: '#334e68',
                  position: 'relative',
                  margin: '0',
                  bottom: '0.75rem',
                },
              },
            }}
          >
            <div className="project-value">
              <span>
              <ConstructionIcon />
              </span>
              <p>{categoryDesc}</p>
            </div>
          </Tooltip>

          <Tooltip
            title="Bidding Last Date"
            placement="bottom-start"
            PopperProps={{
              sx: {
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'f0f4f8',
                  letterSpacing: '0.1rem',
                  padding: `0.5 1`,
                  backgroundColor: '#334e68',
                  position: 'relative',
                  margin: '0',
                  bottom: '0.75rem',
                },
              },
            }}
          >
            <div className="project-value">
              <span>
                <CalendarTodayIcon />
              </span>
              <p>{`${plannedDate[2]}/${plannedDate[1]}/${plannedDate[0]}`}</p>
            </div>
          </Tooltip>
        </div>
      </div>
      <div className="right-wrapper">
        {/* <div className="complete-container">
          <div className="complete">
            <div>$ Complete</div>
            <p></p>
          </div>
          <div
            class="progress-bar"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div> */}
        <div className="btns-container">
          {/* <button className="btn-upload ">
            <span>
              <AiOutlineCloudUpload />
            </span>
            Bulk Upload
          </button> */}
          <button className="btn-newContact">
            <span>
              <ThumbUpIcon />
            </span>
            Approve
          </button>
          <button className="btn-decline">
            <span>
              <ThumbDownAltIcon />
            </span>
            Decline
          </button>
        </div>
      </div>
    </Wrapper>
  )
}
export default ProjectImpInfoComponent

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--grey-100);
  padding: 2rem;
  background-color: var(--white);

  .left-wrapper {
    padding-left: 1rem;
    border-left: 0.3rem solid var(--primary-600);
    border-radius: 1px;
  }

  .left-header {
    font-size: 1.4rem;
    font-weight: 700;
    text-transform: capitalize;
    letter-spacing: 0.1rem;
    color: var(--grey-700);
  }

  .left-content {
    display: flex;
    color: var(--grey-400);
    gap: 1rem;
  }

  .location {
    display: flex;
    border-right: 1px solid var(--grey-50);
    padding-right: 1rem;
    align-items: baseline;
    gap: 0.5rem;
  }

  .location span {
    display: grid;
    place-items: center;
    position: relative;
    top: 0.1rem;
    color: var(--grey-600);
  }

  .location p {
    margin-bottom: 0;
  }

  .project-value {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .project-value span {
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    position: relative;
    top: 0.2rem;
    color: var(--grey-500);
  }

  .project-value p {
    margin-bottom: 0;
  }

  .right-wrapper {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .complete-container {
    padding-right: 1rem;
    border-right: 1px solid var(--grey-50);
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .complete div {
    font-size: 0.8rem;
    color: var(--grey-500);
  }

  .complete p {
    font-size: 0.9rem;
    margin-bottom: 0;
    font-weight: 600;
    text-align: right;
  }

  .complete p::before {
    counter-reset: percentage var(--progress-value);
    content: counter(percentage) '%';
    animation: progress 2s 1 forwards;
  }

  .progress-bar {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: radial-gradient(closest-side, white 79%, transparent 80% 100%),
      conic-gradient(
        var(--primary-400) calc(var(--progress-value) * 1%),
        var(--grey-100) 0
      );
    animation: progress 2s 1 forwards;
  }

  .btns-container {
    display: flex;
    gap: 1rem;
  }

  .btn-upload {
    padding: 0.4rem 0.5rem;
    background: transparent;
    border: 1px solid var(--grey-100);
    border-radius: 5px;
    display: flex;
    gap: 0.5rem;
    color: var(--grey-600);
    transition: var(--transition);
    cursor: pointer;
  }

  .btn-upload span {
    display: grid;
    place-items: center;
    font-size: 1.2rem;
  }
  .btn-upload:hover {
    background-color: #f2f5f8;
    transform: scale(1.05);
  }

  .btn-newContact {
    padding: 0.4rem 0.5rem;
    background: var(--primary-500);
    border: 1px solid var(--grey-100);
    border-radius: 5px;
    display: flex;
    gap: 0.5rem;
    color: var(--grey-50);
    cursor: pointer;
  }

  .btn-newContact span {
    display: grid;
    place-items: center;
    font-size: 1.2rem;
  }

  .btn-newContact:hover {
    background-color: var(--primary-600);
    transform: scale(1.05);
  }

  .btn-decline {
    padding: 0.4rem 0.5rem;
    background: #e23140;
    border: 1px solid var(--grey-100);
    border-radius: 5px;
    display: flex;
    gap: 0.5rem;
    color: var(--white);
    cursor: pointer;
  }

  .btn-decline span {
    display: grid;
    place-items: center;
    font-size: 1.2rem;
  }

  .btn-decline:hover {
    background: #d62e3c;
    transform: scale(1.05);
  }
`
