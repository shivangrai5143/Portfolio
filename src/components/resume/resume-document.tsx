import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import type { ResumeData } from '@/types';

// Register standard fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff' }, // Regular
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff', fontWeight: 700 }, // Bold
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    marginBottom: 4,
  },
  contactDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    color: '#555555',
  },
  contactItem: {
    fontSize: 9,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111111',
    textTransform: 'uppercase',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: 2,
  },
  itemGroup: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: '#111111',
  },
  itemSubtitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#444444',
  },
  itemDate: {
    fontSize: 9,
    color: '#666666',
  },
  itemDescription: {
    marginTop: 2,
    color: '#444444',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  bulletIcon: {
    width: 10,
    fontSize: 10,
    lineHeight: 1.5,
  },
  bulletText: {
    flex: 1,
  },
  techStack: {
    fontSize: 9,
    color: '#666666',
    marginTop: 2,
    fontFamily: 'Helvetica-Oblique',
  },
  skillsGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillText: {
    fontSize: 10,
    color: '#333333',
  }
});

interface ResumeDocumentProps {
  data: ResumeData;
}

export const ResumeDocument = ({ data }: ResumeDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.contactDetails}>
          {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
          {data.phone && <Text style={styles.contactItem}>• {data.phone}</Text>}
          {data.location && <Text style={styles.contactItem}>• {data.location}</Text>}
          {/* We will assume social links like LinkedIn/GitHub are passed in the summary or we can add them to ResumeData type */}
        </View>
        {data.summary && (
          <View style={{ marginTop: 8 }}>
            <Text style={styles.itemDescription}>{data.summary}</Text>
          </View>
        )}
      </View>

      {/* SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGroup}>
            <Text style={styles.skillText}>{data.skills.join(' • ')}</Text>
          </View>
        </View>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.title}</Text>
                <Text style={styles.itemDate}>{exp.duration}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp.company}</Text>
              <View style={{ marginTop: 4 }}>
                {exp.points.map((point, j) => (
                  <View key={j} style={styles.bulletPoint}>
                    <Text style={styles.bulletIcon}>•</Text>
                    <Text style={styles.bulletText}>{point}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {proj.title}
                  {proj.githubUrl && (
                    <Link src={proj.githubUrl} style={styles.link}> (GitHub)</Link>
                  )}
                  {proj.liveUrl && (
                    <Link src={proj.liveUrl} style={styles.link}> (Live)</Link>
                  )}
                </Text>
              </View>
              <Text style={styles.itemDescription}>{proj.description}</Text>
              {proj.techStack && proj.techStack.length > 0 && (
                <Text style={styles.techStack}>
                  Tech: {proj.techStack.join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.institution}</Text>
                <Text style={styles.itemDate}>{edu.duration}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{edu.degree}</Text>
              {edu.details && edu.details.length > 0 && (
                <View style={{ marginTop: 4 }}>
                  {edu.details.map((detail, j) => (
                    <View key={j} style={styles.bulletPoint}>
                      <Text style={styles.bulletIcon}>•</Text>
                      <Text style={styles.bulletText}>{detail}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

    </Page>
  </Document>
);

export default ResumeDocument;
