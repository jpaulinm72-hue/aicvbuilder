import { jsPDF } from 'jspdf'

export const exportToPDF = (cvData) => {
  const doc = new jsPDF()
  const { personalInfo, experience, education, skills } = cvData

  // --- Styles ---
  const primaryColor = '#4f46e5'
  const textColor = '#1e293b'
  const lightTextColor = '#64748b'

  // --- Header ---
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(textColor)
  doc.text(personalInfo.name || 'Your Name', 20, 30)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(lightTextColor)
  const contactText = `${personalInfo.location || 'Location'}  |  ${personalInfo.email || 'Email'}  |  ${personalInfo.phone || 'Phone'}`
  doc.text(contactText, 20, 38)

  let currentY = 55

  // --- Helper to draw sections ---
  const drawSectionHeader = (title) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(primaryColor)
    doc.text(title.toUpperCase(), 20, currentY)
    doc.setDrawColor(primaryColor)
    doc.line(20, currentY + 2, 190, currentY + 2)
    currentY += 12
  }

  // --- Summary ---
  if (personalInfo.summary) {
    drawSectionHeader('Summary')
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(textColor)
    const splitSummary = doc.splitTextToSize(personalInfo.summary, 170)
    doc.text(splitSummary, 20, currentY)
    currentY += (splitSummary.length * 5) + 8
  }

  // --- Experience ---
  if (experience.length > 0) {
    drawSectionHeader('Experience')
    experience.forEach((exp) => {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(textColor)
      doc.text(exp.title || 'Job Title', 20, currentY)
      doc.setFont('helvetica', 'italic')
      doc.text(exp.company || 'Company', 20, currentY + 5)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(lightTextColor)
      doc.text(exp.dates || 'Dates', 190, currentY, { align: 'right' })
      
      currentY += 12
      doc.setTextColor(textColor)
      doc.setFontSize(10)
      const splitDesc = doc.splitTextToSize(exp.description || '', 165)
      doc.text(splitDesc, 25, currentY)
      currentY += (splitDesc.length * 5) + 8
    })
  }

  // --- Save ---
  doc.save(`${personalInfo.name || 'CV'}_Resume.pdf`)
}
