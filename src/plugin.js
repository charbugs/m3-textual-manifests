import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'


const useStyles = makeStyles({
  root: {
    padding: '24px',
    overflowY: 'scroll',
  }
})

const fetchJson = (url) => fetch(url, { cache: 'force-cache'}).then(res => res.json())
const fetchText = (url) => fetch(url, { cache: 'force-cache'}).then(res => res.text())
const isHspManifest = (manifest) => manifest.json.attribution === 'Handschriftenportal'

function fetchTextOfCanvas(manifestId, canvasIndex) {
  return fetchJson(manifestId)
    .then(manifest => manifest.sequences[0].canvases[canvasIndex].otherContent[0]['@id'])
    .then(annoListId => fetchJson(annoListId))
    .then(annoList => annoList.resources[0].resource['@id'])
    .then(annoId => fetchText(annoId))
    .then(annotation => annotation)
}

function TextViewer({ manifestId, canvasIndex, windowId }) {
  const [text, setText] = useState('loading...')
  useEffect(() => { fetchTextOfCanvas(manifestId, canvasIndex).then(setText) })
  const cls = useStyles()
  return (
    <div className={cls.root}>
      <Typography>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </Typography>
    </div>
  )
}

function Wrapper({ TargetComponent, targetProps }) {
  const { windowId } = targetProps
  const canvasIndex = useSelector(state => state.windows[windowId].canvasIndex) || 0
  const manifestId = useSelector(state => state.windows[windowId].manifestId)
  const manifest = useSelector(state => state.manifests[manifestId])

  return isHspManifest(manifest)
    ? <TextViewer manifestId={manifestId} canvasIndex={canvasIndex} windowId={windowId} />
    : <TargetComponent {...targetProps} />
}


export default {
  target: 'WindowViewer',
  mode: 'wrap',
  component: Wrapper,
}