import plotly.graph_objects as go
import plotly.express as px

# Data for the portfolio website features progression
data = [
    {
        "Level": "Basic",
        "Features": ["HTML Structure", "Basic CSS", "Responsive Layout", "Navigation", "Contact Form"],
        "Difficulty": 1,
        "Size": 100,
        "Y_Pos": 1
    },
    {
        "Level": "Intermediate", 
        "Features": ["CSS Grid/Flexbox", "JavaScript", "Smooth Scrolling", "Image Optimization", "Form Validation"],
        "Difficulty": 2,
        "Size": 80,
        "Y_Pos": 2
    },
    {
        "Level": "Advanced",
        "Features": ["CSS Animations", "Hover Effects", "Parallax", "Loading Animations", "Mobile Optimization"], 
        "Difficulty": 3,
        "Size": 60,
        "Y_Pos": 3
    },
    {
        "Level": "Expert",
        "Features": ["3D Transforms", "Particle Systems", "Custom Cursor", "Glassmorphism", "Scroll Animations"],
        "Difficulty": 4,
        "Size": 40,
        "Y_Pos": 4
    },
    {
        "Level": "Master",
        "Features": ["WebGL/Three.js", "Advanced Particles", "Interactive Anim", "Real-time Effects", "Performance Opt"],
        "Difficulty": 5,
        "Size": 20,
        "Y_Pos": 5
    }
]

# Brand colors in order
colors = ["#1FB8CD", "#FFC185", "#ECEBD5", "#5D878F", "#D2BA4C"]

fig = go.Figure()

# Create pyramid blocks using scatter plot with large markers
for i, level_data in enumerate(data):
    features_text = "<br>• ".join(level_data["Features"])
    hover_text = f"<b>{level_data['Level']} Level</b><br>Difficulty: {level_data['Difficulty']}<br><br>Key Features:<br>• {features_text}"
    
    # Add main pyramid block
    fig.add_trace(go.Scatter(
        x=[0],
        y=[level_data["Y_Pos"]],
        mode='markers+text',
        marker=dict(
            size=level_data["Size"],
            color=colors[i],
            line=dict(width=2, color='white')
        ),
        text=f"{level_data['Level']}<br>Level {level_data['Difficulty']}",
        textposition='middle center',
        textfont=dict(size=14, color='black'),
        hovertemplate=hover_text + '<extra></extra>',
        showlegend=False,
        cliponaxis=False
    ))

# Add progression arrows between levels
for i in range(len(data)-1):
    fig.add_annotation(
        x=0,
        y=data[i]["Y_Pos"] + 0.4,
        ax=0,
        ay=data[i+1]["Y_Pos"] - 0.4,
        arrowhead=2,
        arrowsize=1.5,
        arrowwidth=3,
        arrowcolor="#333333",
        showarrow=True,
        arrowside="end"
    )

# Update layout
fig.update_layout(
    title="Portfolio Dev Skills Pyramid",
    xaxis=dict(
        showticklabels=False,
        showgrid=False,
        zeroline=False,
        range=[-1.5, 1.5]
    ),
    yaxis=dict(
        showticklabels=False,
        showgrid=False,
        zeroline=False,
        range=[0.5, 5.8]
    ),
    plot_bgcolor='rgba(0,0,0,0)',
    paper_bgcolor='rgba(0,0,0,0)'
)

# Save the chart
fig.write_image("portfolio_progression_pyramid.png")