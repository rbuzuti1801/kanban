import plotly.graph_objects as go
import pandas as pd

# Data for deployment options with proper scaling
data = {
    "platform": ["Netlify", "Vercel", "GitHub Pages", "Docker", "VPS/Server"],
    "easeOfSetup": [5, 5, 4, 3, 2],
    "cost": [1, 1, 1, 2, 3],  # 1=Free, 2=Low, 3=Medium, 4=High
    "sslSupport": [5, 5, 5, 3, 3],  # Scale to 1-5: 5=Yes, 3=Config, 1=No
    "scalability": [4, 4, 3, 5, 5]
}

df = pd.DataFrame(data)

# Create grouped bar chart
fig = go.Figure()

# Define colors from the brand palette
colors = ['#1FB8CD', '#FFC185', '#ECEBD5', '#5D878F']

# Add bars for each metric with clear labels (under 15 chars)
fig.add_trace(go.Bar(
    name='Setup Ease',
    x=df['platform'],
    y=df['easeOfSetup'],
    marker_color=colors[0],
    hovertemplate='%{x}<br>Setup Ease: %{y}/5<extra></extra>',
    cliponaxis=False
))

fig.add_trace(go.Bar(
    name='Cost Level',
    x=df['platform'],
    y=df['cost'],
    marker_color=colors[1],
    hovertemplate='%{x}<br>Cost: %{y}/4<extra></extra>',
    cliponaxis=False
))

fig.add_trace(go.Bar(
    name='SSL Support',
    x=df['platform'],
    y=df['sslSupport'],
    marker_color=colors[2],
    hovertemplate='%{x}<br>SSL: %{y}/5<extra></extra>',
    cliponaxis=False
))

fig.add_trace(go.Bar(
    name='Scalability',
    x=df['platform'],
    y=df['scalability'],
    marker_color=colors[3],
    hovertemplate='%{x}<br>Scale: %{y}/5<extra></extra>',
    cliponaxis=False
))

# Update layout with better spacing and readability
fig.update_layout(
    title='React Kanban Deploy Options',
    xaxis_title='Platform',
    yaxis_title='Score',
    barmode='group',
    bargap=0.4,  # Space between platform groups
    bargroupgap=0.1,  # Space between bars in group
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes for better readability
fig.update_yaxes(range=[0, 5.5])
fig.update_xaxes(tickangle=0)  # Horizontal labels

# Save the chart
fig.write_image('deployment_comparison.png')