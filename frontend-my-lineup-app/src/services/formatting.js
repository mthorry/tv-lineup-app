export function formatTitle(title) {
  return title.toLowerCase().replace(/[&#,+()$~%.":*<>{}]/g, '').replace(/[']/g,'-').split(" ").join("-").replace("--", "-")
}

export function formatSummary(summary) {
  if (summary === null) {
    return "Not available"
  } else if (summary.length > 500)  {
    return summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "").substring(0,500).concat('...')
   } else {
    return summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "")
  }
}

export function formatSummaryShort(summary) {
  if (summary === null) {
    return "Not available"
  } else if (summary.length > 200)  {
    return summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "").substring(0,200).concat('...')
   } else {
    return summary.replace("<p>", "").replace("</p>", "").replace("<b>", "").replace("</b>", "").replace("<i>", "").replace("</i>", "")
  }
}

export function formatTime(time) {
  return parseInt(time.substring(0,2)) > 12 ? `at ` + (parseInt(time.substring(0,2)) - 12) + (time.substring(2)) + ` pm` : time
}