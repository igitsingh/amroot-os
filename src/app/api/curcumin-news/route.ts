import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
  try {
    const feedUrl = 'https://news.google.com/rss/search?q=curcumin+market+size+OR+curcumin+trends+OR+curcumin+research&hl=en-US&gl=US&ceid=US:en';
    const feed = await parser.parseURL(feedUrl);
    
    // Process and clean up the feed items
    const articles = feed.items.slice(0, 15).map(item => {
      // Google News titles often append the source at the end like "- Source Name"
      const titleParts = item.title?.split(' - ') || [];
      const source = titleParts.length > 1 ? titleParts.pop() : 'Google News';
      const cleanTitle = titleParts.join(' - ') || item.title;

      return {
        title: cleanTitle,
        link: item.link,
        pubDate: item.pubDate,
        source: source?.trim(),
        contentSnippet: item.contentSnippet || '',
      };
    });

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching curcumin news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market news.' },
      { status: 500 }
    );
  }
}
